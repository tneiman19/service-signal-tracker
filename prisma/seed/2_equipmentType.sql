WITH source (id, equipmentTypeName, active) AS (
    VALUES
        ('f39badc3-0d16-4373-b8f9-cb0756200339', 'Washer', true),
        ('692acc2b-83d7-402f-9e39-003f515dc034', 'Dryer', true),
        ('d62af539-601b-4ba2-a67c-25d62d280576', 'Refrigerator', false),
        ('e860fae8-07c3-4f0a-9be1-c38dbfce046e', 'Dishwasher', false),
        ('cd6b6f4b-fb14-4058-9917-41c720b8eb82', 'Microwave', false),
        ('69ceb150-318b-46e5-9722-34cbe2fab5da', 'Vacuum', false),
        ('92e29dde-c820-4112-875f-a2c1f8997939', 'Air Conditioner', false),
        ('08e76ece-5ec8-448a-80f5-693995c0a391', 'Heater', false)
)
INSERT INTO "EquipmentType" (id, "equipmentTypeName", active)
SELECT cast(id as uuid), equipmentTypeName, active
FROM source
ON CONFLICT ("equipmentTypeName") DO NOTHING;
