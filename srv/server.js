
const helmet = require('helmet');
const LOG = cds.log('logicalstar');
const os = require("os");

cds.on('bootstrap', app => {

    app.use(helmet())
    // Reduce finger printing
    app.disable('x-powered-by')

    app.get('/ping', (_, res) => {
        res.status(200).send('OK')
    })

    app.get('/health', async (_, res) => {

        // Check DB Connection
        let dbStatus = 'Running';
        let message = '';
        let status = 200;
        try {
            const db = await cds.connect.to('db');
            let query = SELECT.from('logicalstar.bookshop.Books').limit(1);
            let result = await db.run(query);
        } catch (e) {
            dbStatus = 'Unavailable'
            message = e.message;
            status = 500;
        }

        // Add checks for other used services




        // Set the reponse
        let responseBody = { "dbStatus": dbStatus,
          "memoryUsage": os.totalmem() - os.freemem()
        };
        if (message) {
            responseBody.message = message;
        }
        res.status(status).send(responseBody)
    })
})


/*
* Batch job to aggregate the request data and delete logs older than a day every 30 seconds
*/
cds.spawn({ user: cds.User.privileged, every: 10000 /* ms */ }, async () => {
    const currentTime = new Date();
    const yesterday = new Date(currentTime - (1000 * 3600 * 24))
    const currentTimeIso = currentTime.toISOString();
    LOG.info("Batch job for aggregation ran at: " + currentTime);

    const db = await cds.connect.to('db');

    // Get last record (If no last record get all logs from table)
    let lastAggregationQuery = SELECT.from('logicalstar.metrics.AggregatedMetrics').limit(1).orderBy('timeFrom desc');
    let lastAggregation = [];
    lastAggregation = await db.run(lastAggregationQuery);

    const timeToIso = currentTime;
    let timeFromIso = yesterday.toISOString(); // Default to the last 24 hours
    if (lastAggregation.length > 0) {
        LOG.info("Found Aggregation Record with ID: " + lastAggregation[0].ID);
        timeFromIso = new Date( new Date(lastAggregation[0].timeTo) + 1000).toISOString();
    } else {
        LOG.info("No existing aggregations found.  Reading all HTTP requests for the last 24 hours to create initial aggregated record");
    }

    // Run query to aggregate data for time
    let httpRequestsQuery = '';
    httpRequestsQuery = SELECT.from('logicalstar.metrics.HTTPRequestLog').where({ createdAt: { '>': timeFromIso }, and: { createdAt: { '<=': timeToIso } } });
    httpRequestsToAggregate = await db.run(httpRequestsQuery);

    // Aggregate Records and store in DB
    const aggregatedRecord = {
        "accessCount": httpRequestsToAggregate.length,
        "timeFrom": timeFromIso,
        "timeTo": timeToIso
    };
    await INSERT.into('logicalstar.metrics.AggregatedMetrics', aggregatedRecord);

    
    // Delete HTTP Records older than 24 hours
    httpRequestsQuery = DELETE.from('logicalstar.metrics.HTTPRequestLog').where({ createdAt: { '<=': yesterday.toISOString() }});
    httpRequestsToAggregate = await db.run(httpRequestsQuery);
})

module.exports = cds.server