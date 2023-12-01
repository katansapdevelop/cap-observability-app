const LOG = cds.log('logicalstar');

class MetricsService extends cds.ApplicationService {
    async init() {
      const { HTTPRequestLog } = this.entities;
      
      this.on ('logRequest', async req => {
        await INSERT.into (HTTPRequestLog, req.data.request);
      });      

      return super.init()
    }
  }
  module.exports = MetricsService