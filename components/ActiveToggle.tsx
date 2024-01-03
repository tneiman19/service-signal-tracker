"use client";
import { Switch } from "@/components/index";
import axios from "axios";
import { toast } from "react-toastify";

type TableToApiMap = {
  [key: string]: string;
};

const ActiveToggle = ({
  recordId,
  table,
  active,
}: {
  recordId: string;
  table: string;
  active: boolean;
}) => {
  const handleSwitchClick = async () => {
    try {
      const tableToApiMap: TableToApiMap = {
        entity: `/api/status_update/entity/${recordId}`,
        property: `/api/status_update/property/${recordId}`,
        building: `/api/status_update/building/${recordId}`,
        unit: `/api/status_update/unit/${recordId}`,
      };

      const api = tableToApiMap[table];
      console.log(api);
      await axios.patch(api);
      toast.success(`Updated ${table} successfully.`);
    } catch (error) {
      toast.error(`Error updating ${table}.`);
    }
  };

  return (
    <div>
      <Switch
        name="active"
        defaultChecked={active}
        onClick={handleSwitchClick}
      />
    </div>
  );
};

export default ActiveToggle;
