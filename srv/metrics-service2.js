const LOG = cds.log('logicalstar');

class BookMetricsService2 extends cds.ApplicationService {
    async init() {
      const { HTTPRequestLog } = this.entities;
      
      this.on ('logRequest', async req => {
        await INSERT.into (HTTPRequestLog, req.data.request);
      });      

      return super.init()
    }
  }
  module.exports = BookMetricsService2