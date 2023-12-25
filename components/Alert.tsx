import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  errorHeader?: any;
  errorMessage?: any;
}

export function AlertDestructive({ errorHeader, errorMessage }: Props) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="text-center">{errorHeader}</AlertTitle>
      <AlertDescription className="text-center">{errorMessage}</AlertDescription>
    </Alert>
  );
}
