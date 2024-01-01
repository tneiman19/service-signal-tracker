import axios from "axios";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BuildingResults{
  id: string,
  buildingWithProperty: string
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectTest = () => {
  const [buildings, setBuildings] = useState<BuildingResults[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/building");
        setBuildings(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        throw new Error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Skeleton className="w-auto h-8" />;
  }

  if (error) {
    return <p className="text-xs text-red-500 ">{error.message}</p>;
  }

  return (
    <>
      {/*when using this, make sure to wrap it with <Select> in the file where you intend to use it. This will allow you to have control from React Hook Form.*/}
      <SelectTrigger>
        <SelectValue placeholder="Select a building" />
      </SelectTrigger>
      <SelectContent>
        {buildings.map((building) => (
          <SelectItem key={building.id} value={building.id}>
            {building.buildingWithProperty}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  );
};

export default SelectTest;
