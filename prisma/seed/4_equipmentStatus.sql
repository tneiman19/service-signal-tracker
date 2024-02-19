drop table if exists "temp_EquipmentStatus";

create temp table "temp_EquipmentStatus" (
	id int,
    status VARCHAR(35)
);

insert
	into
	"temp_EquipmentStatus" (id,
	status)
values
(1,
'Active'),
(2,
'Decommissioned'),
(3,
'In Storage'),
(4,
'New - Awaiting Setup'),
(5,
'Service Needed'),
(6,
'Sold'),
(7,
'Under Maintenance'),
(8,
'Waiting for Parts'),
(9,
'Warranty Claim');

insert
	into
	"EquipmentStatus" (id,
	status)
select
	id,
	status
from
	"temp_EquipmentStatus" t
where
	not exists (
	select
		*
	from
		"EquipmentStatus" e
	where
		e."status" = t."status");

drop table if exists "temp_EquipmentStatus";
