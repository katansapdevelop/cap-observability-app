using {
    managed,
    sap
} from '@sap/cds/common';

namespace logicalstar.metrics;

entity AggregatedMetrics : managed {
    key ID        : UUID;
        accessCount : Integer;
        timeFrom  : Timestamp;
        timeTo    : Timestamp
}

entity HTTPRequestLog : managed {
    key ID     : UUID;
        entity : String;
        action : String
}
