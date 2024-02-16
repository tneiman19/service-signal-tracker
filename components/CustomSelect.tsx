"use client";

import CustomSelectContent from "@/components/CustomSelectContent";
import { Select, SelectTrigger, SelectValue } from "@/components/index";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SelectProps {
  api: string;
  label: string;
  placeholder: string;
  field: {
    onChange: (value: any) => void;
    onBlur: () => void;
    value: any;
    name: string;
    ref: React.Ref<any>;
  };
}

export const CustomSelect: React.FC<SelectProps> = ({
  api,
  label,
  placeholder,
  field,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <CustomSelectContent api={api} />
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default CustomSelect;
