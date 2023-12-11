# Template App

A simple template CAP App (without a UI5 App) to be used as a base project for new apps

Incorporates Best Practices for:
- Security
- Observability

![Node.js 18.18.0](https://img.shields.io/badge/Node.js-v18.18.0-green)
![@sap/cds 7.4.0](https://img.shields.io/badge/@sap/cds-v7.4.0-green)

## Observability
Implements a custom ping and health check.  Implements logging use the CDS log service, which natively can be used to ingest into Kibana

Concepts taken from the Azure Cloud Design Pattern, [Monitor Instance Health](https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring)


### Grafana Cloud
<img src="Grafana.png" width="1000">


### Batch Job
A batch job has been setup in the [server.js](/srv/server.js) file. It runs every 60 seconds to aggergate data from the http request logs to determine the total requests in that period.

## Helmet
[Helmet](https://helmetjs.github.io/) helps secure Express apps by setting HTTP response headers and/or removing them

## Testing 


### Chai/Jest
Added support for tests via Chai/Jest
```
npm run test
```


### .http
Some simple tests have also been setup in tests.http folder to support local testing


