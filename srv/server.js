
const helmet = require('helmet');

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
        let responseBody = { "dbStatus": dbStatus};
        if(message){
            responseBody.message = message;
        }
        res.status(status).send(responseBody)
    })
})

module.exports = cds.server 