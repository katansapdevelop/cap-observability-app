namespace logicalstar.srv;

using {logicalstar.metrics as db} from '../db/metrics';

@path: '/bookMetrics'

service BookMetricsService @(requires: 'authenticated-user') {
    
    @readonly
    entity HTTPRequestLog as projection on db.HTTPRequestLog
    type httpRequest {
        entity: String;
        action: String
    }
    action logRequest(request: httpRequest);

    @readonly
    entity Metrics as projection on db.AggregatedMetrics;

}
