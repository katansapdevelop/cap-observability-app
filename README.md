# Template App

A simple template CAP App (without a UI5 App) to be used as a base project for new apps

Incorporates Best Practices for:
- Security
- Observability

## Observability
Implements a custom ping and health check.  Implements logging use the CDS log service, which natively can be used to ingest into Kibana


## Helmet
[Helmet](https://helmetjs.github.io/) helps secure Express apps by setting HTTP response headers and/or removing them

## Testing 
Added support for tests via Chai
