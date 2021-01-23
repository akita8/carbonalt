import click

import forecast.predict


@click.command()
def predict():
    forecast.predict.run()
