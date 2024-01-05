"use client";
import { Switch } from "@/components/index";
import axios from "axios";
import { toast } from "react-toastify";

const ActiveToggle = ({
  active,
  api,
  type,
}: {
  active: boolean;
  api: string;
  type: string;
}) => {
  const handleSwitchClick = async () => {
    try {
      await axios.patch(api);
      toast.success(`Updated ${type} successfully.`);
    } catch (error) {
      toast.error(`Error updating ${type}.`);
    }
  };

  return (
    <div>
      <Switch defaultChecked={active} onClick={handleSwitchClick} />
    </div>
  );
};

export default ActiveToggle;
