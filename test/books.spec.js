const cds = require('@sap/cds');

describe('Test Books service', () => {
    const { GET, expect, axios } =  cds.test(__dirname+'/../', '--with-mocks');
    axios.defaults.auth = { username: 'alice', password: '' }

    it('should return all books', async () => {
        const books = await GET `/admin/Books`;
        expect(books.data).to.be.an('object');
        expect(books.data.value).to.be.an('array');
        expect(books.data.value).to.have.lengthOf(5);
    });
});


    
describe('Test Health', () => {
    const { GET, expect, axios } =  cds.test(__dirname+'/../', '--with-mocks');
    axios.defaults.auth = { username: 'health', password: 'password' }

    it('should return health', async () => {
        const health = await GET `/health`;
        expect(health.data).to.be.an('object');
        expect(health.data.dbStatus).to.equal('Running');
    });
});


describe('Test Metrics service', () => {
    const { GET, expect, axios } =  cds.test(__dirname+'/../', '--with-mocks');
    axios.defaults.auth = { username: 'alice', password: '' }

    it('should return all http requests', async () => {
        await GET `/admin/Books`;
        await GET `/admin/Books`;
        await GET `/admin/Books`;
        const httpRequests = await GET `/bookMetrics/HTTPRequestLog`;
        expect(httpRequests.data).to.be.an('object');
        expect(httpRequests.data.value).to.be.an('array');
        expect(httpRequests.data.value).to.have.lengthOf(3);
    });


    const wait = (seconds) => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }


    it('should return all metrics', async () => {
        await wait(20);
        const metrics = await GET `/bookMetrics/Metrics`;
        expect(metrics.data).to.be.an('object');
        expect(metrics.data.value).to.be.an('array');
    }, 30000);



    
});




