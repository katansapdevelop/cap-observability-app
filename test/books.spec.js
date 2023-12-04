const cds = require('@sap/cds');

describe('Test Books service', () => {
    let log = cds.test.log()
    const { GET, expect, axios } =  cds.test(__dirname+'/../', '--with-mocks');
    axios.defaults.auth = { username: 'alice', password: '' }

    it('should return all books', async () => {
        const books = await GET `/admin/Books`;
        expect(books.data).to.be.an('object');
        expect(books.data.value).to.be.an('array');
        expect(books.data.value).to.have.lengthOf(5);
    });
});


describe('Test Metrics service', () => {
    let log = cds.test.log()
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
});