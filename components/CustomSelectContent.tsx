"use client";

import { SelectContent, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

type SelectOptions = {
  id: string;
  value: string;
}[];

interface SelectProps {
  api: string;
}

const CustomSelectContent: React.FC<SelectProps> = ({ api }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [options, setOptions] = useState<SelectOptions>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        setOptions(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        throw new Error(err);
      }
    };

    fetchData();
  }, [api]);

  if (loading) {
    return <Skeleton className="w-auto h-8" />;
  }

  if (error) {
    return <p className="text-xs text-red-500 ">{error.message}</p>;
  }

  return (
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.id} value={option.id}>
          {option.value}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default CustomSelectContent;
