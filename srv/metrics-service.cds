namespace logicalstar.srv;
using {logicalstar.metrics as db} from '../db/metrics';
service BookMetricsService @(requires: 'authenticated-user', path: '/bookMetrics') {
    @readonly
    entity HTTPRequestLog as projection on db.HTTPRequestLog
    type httpRequest {
        entity: String;
        action: String
    }

    @readonly
    entity Metrics as projection on db.AggregatedMetrics;

    // Actions
    action logRequest(request: httpRequest);
}
