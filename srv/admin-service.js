const { default: cds } = require("@sap/cds");
const LOG = cds.log('logicalstar');


class AdminService extends cds.ApplicationService {
  async init() {
    const { Books } = this.entities;
    const { HTTPRequestLog } = this.entities;
   

    return super.init()
  }

  static handle_logging() {
    this.before('*', req => {
    
      const { HTTPRequestLog } = cds.entities;
      const logRecord = {
        "entity": req.path,
        "action": req.method
      }
      
      cds.tx (async ()=>{
        await INSERT.into (HTTPRequestLog, logRecord);
      })
    })
  }
}
module.exports = AdminService