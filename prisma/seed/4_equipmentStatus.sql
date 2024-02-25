WITH source (id, status) AS (
    VALUES
        (1, 'Active'),
        (2, 'Decommissioned'),
        (3, 'In Storage'),
        (4, 'New - Awaiting Setup'),
        (5, 'Service Needed'),
        (6, 'Sold'),
        (7, 'Under Maintenance'),
        (8, 'Waiting for Parts'),
        (9, 'Warranty Claim')
)
INSERT INTO "EquipmentStatus" (id, status)
SELECT id, status
FROM source
ON CONFLICT ("status") DO NOTHING;
