from datetime import datetime, timedelta, timezone
from os import environ
from pathlib import Path

import logging
import sys
import json

import click

from forecast.data_retrieval import get_energy_production, ENERGY_LABELS_ORDER
from forecast.predict import run

ENTSOE_REGIONS = {"it": "10YIT-GRTN-----B"}

ENERGY_LABELS = {
    "B01": "biomass",
    "B03": "fossil_coal_derived_gas",
    "B04": "fossil_gas",
    "B05": "fossil_hard_coal",
    "B06": "fossil_oil",
    "B09": "geothermal",
    "B10": "hydro_pumped_storage",
    "B11": "hydro_run_of_river_and_poundage",
    "B12": "hydro_water_reservoir",
    "B15": "other_renewable",
    "B16": "solar",
    "B17": "waste",
    "B19": "wind_onshore",
}


def setup_logger(level):
    logger = logging.getLogger("engine")
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(level)
    return logger


def save_predictions(predictions, forecast_directory, start):
    with open(forecast_directory / "data" / "predictions.json", "w") as f:
        f.write(
            json.dumps(
                {
                    "predictions": [
                        {
                            "country": "it",
                            "startTime": start.isoformat(),
                            "prediction": [
                                {
                                    "label": ENERGY_LABELS[ENERGY_LABELS_ORDER[i]],
                                    "values": column.tolist(),
                                }
                                for i, column in enumerate(predictions.T)
                            ],
                        }
                    ],
                }
            ),
        )


def start_of_hour(time):
    return time.replace(minute=0, second=0, microsecond=0)


@click.command()
def predict():
    forecast_directory = Path(__file__).parent.parent
    logger = setup_logger(logging.DEBUG)
    now = start_of_hour(datetime.now(timezone.utc) - timedelta(hours=1))
    two_days_before = start_of_hour(now - timedelta(days=2))
    token = environ.get("ENTSOE_TOKEN")
    if not token:
        logger.error("missing required ENTSOE_TOKEN environment variable, exiting")
        sys.exit(1)

    logger.debug("retrieving data from %s to %s (UTC)", two_days_before, now)
    try:
        energy_production = get_energy_production(
            two_days_before, now, ENTSOE_REGIONS["it"], token
        )
    except Exception as e:
        logger.error("failed to get energy production: %s, exiting", e)
        sys.exit(1)
    logger.debug("retrieved energy production:\n%s", energy_production)

    try:
        predictions = run(energy_production, forecast_directory / "trained_energy_cpu")
    except Exception as e:
        logger.error("failed to produce preditions: %s, exiting", e)
        sys.exit(1)
    logger.debug("produced energy predictions:\n%s", predictions)

    logger.debug(predictions.shape)

    # FIXME replace with actual predictions when those are fixed
    save_predictions(
        predictions, forecast_directory, now
    )
