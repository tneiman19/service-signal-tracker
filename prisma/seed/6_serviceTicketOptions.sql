WITH source (id, equipmentTypeId, active, description) AS (
    VALUES
        ('f98574cf-e87e-436d-878d-2faf16b0f1bf','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Not Draining or Spinning'),
        ('776ef4cc-ace4-4ee2-8483-a03f4f0b9998','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Not Filling With Water'),
        ('670bc378-a3da-42cd-a267-f27ee03f124e','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Not Dispensing Detergent'),
        ('90aefb4c-2e90-4730-a97c-b7b9e98c53c3','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Door/Lid Issues'),
        ('56855cb3-19e9-4b06-9d8b-7f1e6bbe5c77','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Water Leaks'),
        ('2363d5bd-23bb-437b-9533-626789f40371','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Excessive Noise or Vibration'),
        ('26ada74f-ccad-4e3c-bc7d-64c288989ffb','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Error Messages'),
        ('92252f72-051a-49d9-abb0-6e985985daaf','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Poor Cleaning'),
        ('f17fa4dc-b79e-41e8-9752-2a3c334c31ea','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Cycle Interruption'),
        ('3b729039-1f0d-4e8e-bf06-6ed580abfd15','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Machine Not Starting'),
        ('3546afb5-814b-48ef-af11-6efc79c3066c','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Overflows or Overfills'),
        ('4b143f67-7890-4bfa-abdf-bbebd58c708b','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Long Cycle Times'),
        ('ff0ed0ac-d9c9-4d6b-942d-0b954b967dce','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Issues with Payment or Coin Mechanisms'),
        ('7b89753b-6a74-4a0d-9f51-4905f83cafdc','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Not Turning On/Power Issues'),
        ('02b50fb5-75f2-4e6c-b2c4-3760df0d7cc6','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Cycling On and Off'),
        ('a27bbaba-5d35-45a3-8bc7-befe728f26a0','f39badc3-0d16-4373-b8f9-cb0756200339', true, 'Display or Control Issues'),
        ('70275149-ae6f-46f0-a901-d435fc4708ee','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Heating'),
        ('12aa4a19-1ad8-4cd0-b6bb-64bdc30e3370','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Drying Properly'),
        ('cde90233-e2e4-4280-a4fa-78f6f1c1d52a','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Starting'),
        ('6185a46c-425c-4b08-b4e2-20388d00fd79','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Door/Lid Issues'),
        ('4b3e4a5f-e1bd-4f11-9e81-d2aa579082e5','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Overheating'),
        ('87234ac7-2ca1-40a8-adda-51c5857ad7e9','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Excessive Noise or Vibration'),
        ('d92aee48-c017-430b-ad92-4fe0eaf3cf5f','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Error Messages'),
        ('607f40bc-01f7-44b1-8eb5-5cc0bec1c136','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Poor Cleaning'),
        ('5e8377b5-2b92-4013-a041-bdf4b8cb8392','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Cycle Interruption'),
        ('2b50b612-8765-49f4-bf94-ec1bb7eeb7fc','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Burn Marks or Smell'),
        ('13d44e1e-8790-4060-92b2-bcb00792e97c','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Tumbling or Rotating'),
        ('9ff0709c-9823-451c-bc05-c76a3ad2c9c1','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Shutting Off'),
        ('8ad80620-3671-4262-97bb-4152da7a7d9d','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Issues with Payment or Coin Mechanisms'),
        ('13d44e1e-8790-4060-92b2-bcb00792e97c','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Display or Control Issues'),
        ('9c6166eb-cd45-41f3-bef9-6754c557c7bf','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Not Turning On/Power Issues'),
        ('dec89151-e1d2-4ff1-be78-7b724892ff8b','692acc2b-83d7-402f-9e39-003f515dc034', true, 'Uneven Drying')
)
INSERT INTO "ServiceTicketOptions" (id, "equipmentTypeId", active, description)
SELECT cast(id as uuid), cast(equipmentTypeId as uuid), active, description
FROM source
ON CONFLICT ("id") DO NOTHING;