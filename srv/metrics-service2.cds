namespace logicalstar.srv;

using {logicalstar.metrics as db} from '../db/metrics';

service BookMetricsService2 @(
    requires: 'authenticated-user',
    path    : '/bookMetrics2'
) {
    @readonly
    entity HTTPRequestLog as projection on db.HTTPRequestLog;

    @readonly
    entity Metrics        as projection on db.AggregatedMetrics;

    // Types
    type httpRequest {
        entity : String;
        action : String
    };

    // Actions
    action logRequest(request : httpRequest);

}
