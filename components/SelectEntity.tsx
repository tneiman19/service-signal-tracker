import axios from "axios";
import { Entity } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectEntity = () => {
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    axios.get("/api/entity").then((res) => setEntities(res.data));
  }, []);

  return (
    <>
      {/*when using this, make sure to wrap it with <Select> in the file where you intend to use it. This will allow you to have control from React Hook Form.*/}
      <SelectTrigger>
        <SelectValue placeholder="Select an entity" />
      </SelectTrigger>
      <SelectContent>
        {entities.map((entity) => (
          <SelectItem key={entity.id} value={entity.id}>
            {entity.entityName}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  );
};

export default SelectEntity;
