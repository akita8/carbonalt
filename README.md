# Carbonalt

## Forecast

### Build

In order to build the forecast module, install [poetry](https://python-poetry.org/docs/), open a terminal in the forecast folder and run `poetry install`,
add `--no-dev` at the end if you don't need the development dependencies(found in forecast/pyproject.toml)

### Run

In order to run forecast, in the same terminal and folder run `ENTSOE_TOKEN="secret_token" poetry run predict` (replace `secret_token` with actual entsoe token).