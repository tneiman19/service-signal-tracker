"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  delete_type: string;
  delete_name: string;
  api_url: string;
  redirect_url: string;
  handleErrorMessage: (header: string, message: string) => void;
}

export function DeleteButton({
  delete_type,
  delete_name,
  api_url,
  redirect_url,
  handleErrorMessage,
}: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`${api_url}`);
      toast.success(`${delete_type} deleted successfully.`);
      router.push(`${redirect_url}`);
      router.refresh();
    } catch (error: unknown) {
      console.log(error);
      toast.error(`Issue deleting ${delete_type}.`);
      error instanceof AxiosError
        ? handleErrorMessage(
            `${error.code}`,
            error.response ? `${error.response.data.errorCode}` : ""
          )
        : handleErrorMessage("Error", `Issue deleting ${delete_type}.`);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {delete_name} from our servers.
              Deleting this {delete_type} will also delete all associated{" "}
              {delete_type} data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-700" onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
