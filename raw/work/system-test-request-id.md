# Synthetic source: Request IDs in backend systems

Status: test fixture created for infrastructure acceptance testing.

1. A request ID is an identifier assigned to an incoming request.
2. Propagating the same request ID across service boundaries makes it possible
   to correlate log records that belong to one request.
3. Backend services should include the request ID in relevant structured log
   records.
4. A request ID helps investigation, but it does not replace distributed
   tracing because it does not describe the timing and parent-child structure
   of operations.

## Limitations

This is synthetic test material, not an authoritative production reference.
Its claims exist only to verify the wiki ingestion and rollback workflow.
