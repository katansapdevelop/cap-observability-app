const { default: cds } = require("@sap/cds");
const LOG = cds.log('logicalstar');


class AdminService extends cds.ApplicationService {
  async init() {
    const { Books } = this.entities;

    this.before('READ', async req => {
      const metrics = await cds.connect.to('metrics');
      let logRequest = {
        "request": {
          "entity": req.path,
          "action": "GET"
        }
      };
      metrics.logRequest(logRequest);  
      LOG.info("Read details for Book");
    });
    return super.init()
  }
}
module.exports = AdminService