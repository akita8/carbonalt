from datetime import datetime

from lxml import etree
from requests import get
import numpy as np

PERIOD_DATE_FORMAT = "%Y%m%d%H%M"
TIME_INTERVAL_FORMAT = "%Y-%m-%dT%H:%MZ"

ENERGY_LABELS_ORDER = [
    "B01",  # Biomass
    "B03",  # Fossil Coal-derived gas
    "B04",  # Fossil Gas
    "B05",  # Fossil Hard coal
    "B06",  # Fossil Oil
    "B09",  # Geothermal
    "B10",  # Hydro Pumped Storage
    "B11",  # Hydro Run-of-river and poundage
    "B12",  # Hydro Water Reservoir
    "B15",  # Other renewable
    "B16",  # Solar
    "B17",  # Waste
    "B19",  # Wind Onshore
]


def convert_energy_production_to_matrix(energy_production):
    matrix = []
    for label in ENERGY_LABELS_ORDER:
        if label not in energy_production:
            matrix.append([0 for i in range(48)])
        else:
            row = energy_production[label]["energy_values"]
            if len(row) < 48:
                row += [0 for i in range(48 - len(row))]
            matrix.append(row)

    np_matrix = np.array(matrix)
    np_matrix = np_matrix.transpose()
    return np_matrix


def parse_entsoe_response(response):
    root = etree.fromstring(response.encode())
    urn = f"{{{root.nsmap[None]}}}"
    series_by_type = {}

    for child in root:
        if (
            child.tag != f"{urn}TimeSeries"
            or child.find(f"{urn}outBiddingZone_Domain.mRID") is not None
        ):
            continue
        production_type_container = child.find(f"{urn}MktPSRType")
        production_type = production_type_container.find(f"{urn}psrType").text
        period = child.find(f"{urn}Period")
        time_interval = period.find(f"{urn}timeInterval")
        period_start = datetime.strptime(
            time_interval.find(f"{urn}start").text, TIME_INTERVAL_FORMAT
        )
        period_end = datetime.strptime(
            time_interval.find(f"{urn}end").text, TIME_INTERVAL_FORMAT
        )
        previous_period_end = None

        if production_type not in series_by_type:
            series_by_type[production_type] = {
                "energy_values": [],
                "previous_period_end": None,
            }
        else:
            previous_period_end = series_by_type[production_type]["previous_period_end"]

        if previous_period_end:
            hours = int((period_start - previous_period_end).seconds / 3600)
            series_by_type[production_type]["energy_values"] += [
                0 for i in range(hours)
            ]

        for node in period:
            if node.tag == f"{urn}Point":
                try:
                    quantity = int(node.find(f"{urn}quantity").text)
                except ValueError:
                    quantity = 0
                series_by_type[production_type]["energy_values"].append(quantity)

        series_by_type[production_type]["previous_period_end"] = period_end

    return series_by_type


def get_energy_production(start, end, region, token):
    url = (
        "https://transparency.entsoe.eu/api"
        "?documentType=A75&processType=A16"
        f"&in_Domain={region}"
        f"&periodStart={start.strftime(PERIOD_DATE_FORMAT)}"
        f"&periodEnd={end.strftime(PERIOD_DATE_FORMAT)}"
        f"&securityToken={token}"
    )
    response = get(url)
    if response.status_code != 200:
        raise Exception(
            f"call to ENTSOE returned a code different from 200: {response.status_code}"
            f"\nresponse: {response.text}"
        )

    series_by_type = parse_entsoe_response(response.text)

    return convert_energy_production_to_matrix(series_by_type)
