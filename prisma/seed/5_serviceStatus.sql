WITH source (id, status) AS (
    VALUES
        (1, 'Open'),
        (2, 'Pending'),
        (3, 'Closed')

)
INSERT INTO "ServiceStatus" (id, status)
SELECT id, status
FROM source
ON CONFLICT ("status") DO NOTHING;
