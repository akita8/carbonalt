from datetime import datetime, timedelta
from os import environ
from pathlib import Path

import logging
import sys

import click

from forecast.data_retrieval import get_energy_production
from forecast.predict import run


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


@click.command()
def predict():
    logger = setup_logger(logging.DEBUG)
    now = datetime.utcnow() - timedelta(hours=1)
    two_days_before = now - timedelta(days=2)
    token = environ.get("ENTSOE_TOKEN")
    if not token:
        logger.error("missing required ENTSOE_TOKEN environment variable, exiting")
        sys.exit(1)

    try:
        energy_production = get_energy_production(
            two_days_before, now, "10YIT-GRTN-----B", token, logger
        )
    except Exception as e:
        logger.error("failed to get energy production: %s, exiting", e)
        sys.exit(1)
    logger.info(f"retrieved data from {two_days_before} to {now} (UTC)")
    logger.info(energy_production)
    logger.info(
        run(energy_production, Path(__file__).parent.parent / "trained_energy_cpu")
    )
