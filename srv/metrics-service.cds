namespace logicalstar.srv;

using {logicalstar.metrics as db} from '../db/metrics';

service BookMetricsService @(
    requires: 'authenticated-user',
    path    : '/bookMetrics'
) {
    @readonly
    entity HTTPRequestLog as projection on db.HTTPRequestLog;


    @readonly
    entity Metrics        as projection on db.AggregatedMetrics;
}
