import axios from "axios";
import { Property } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectProperty = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/property");
        setProperties(response.data);
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
        <SelectValue placeholder="Select a property" />
      </SelectTrigger>
      <SelectContent>
        {properties.map((property) => (
          <SelectItem key={property.id} value={property.id}>
            {property.propertyName}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  );
};

export default SelectProperty;
