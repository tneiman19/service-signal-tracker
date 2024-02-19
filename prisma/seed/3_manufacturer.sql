drop table if exists "temp_Manufacturer";

create temp table "temp_Manufacturer" (
	id uuid,
    "manufacturerName" VARCHAR(35),
    active BOOLEAN
);

insert
	into
	"temp_Manufacturer" (id,
	"manufacturerName",
	active)
values

	 ('a10bedbb-85ff-4c96-8e3a-f37de6cb3a90',
'Whirlpool Corporation',
true),
	 ('82c76388-8a97-492b-b499-c787e4fbb0c9',
'LG Electronics',
true),
	 ('beb465eb-b8a8-4e03-a9b7-fdc452e7e498',
'Samsung Electronics',
true),
	 ('a562cbf0-2605-47a3-9361-153931b0d1a9',
'Electrolux',
true),
	 ('d97d5ab3-611d-4dd9-9b1a-9ff0f5ea1f67',
'Bosch',
true),
	 ('382aa9cf-1e1f-4936-beef-57c26aada792',
'GE Appliances',
true),
	 ('f66b3b8e-4fb0-4aae-8f8a-a2152a838948',
'Miele',
true),
	 ('a923f3db-4d8f-49ef-810b-a6ef7eef0159',
'Kenmore',
true),
	 ('ffcaff04-3f1d-4564-aac2-67f8a2df7b87',
'Speed Queen',
true),
	 ('f9d68bbc-aae5-47a1-ab55-d1bdcf97edbb',
'Fisher & Paykel',
true),
	 ('793a39ab-13a2-4c4e-b225-bdb956679a0f',
'Siemens',
true),
	 ('2d460c2c-d760-43b0-b348-1477911371eb',
'Hotpoint',
true),
	 ('a44972c3-7eb9-47e0-86a2-62f77d0a35f7',
'Beko',
true),
	 ('7eb99490-467d-4414-925e-b6a7d5c1099e',
'Haier',
true),
	 ('d3c6956c-14e2-4114-acd3-207c7ed8b01f',
'Asko',
true);

insert
	into
	"Manufacturer" (id,
	"manufacturerName",
	active)
select
	id,
	"manufacturerName",
	"active"
from
	"temp_Manufacturer" t
where
	not exists (
	select
		*
	from
		"Manufacturer" e
	where
		e."manufacturerName" = t."manufacturerName");

drop table if exists "temp_Manufacturer";
