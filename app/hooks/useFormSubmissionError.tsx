import { useState } from "react";
import { AlertDestructive } from "@/components/Alert";

export const useFormSubmissionError = () => {
  const [submissionError, setSubmissionError] = useState<boolean>(false);
  const [submissionErrorHeader, setSubmissionErrorHeader] = useState<string>();
  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();

  const setSubmitError = (header: string, message: string) => {
    setSubmissionError(true);
    setSubmissionErrorHeader(header);
    setSubmissionErrorMessage(message);
  };

  const resetSubmitError = () => {
    setSubmissionError(false);
    setSubmissionErrorHeader(undefined);
    setSubmissionErrorMessage(undefined);
  };

  const renderErrorAlert = () => {
    if (submissionError) {
      return (
        <AlertDestructive
          errorHeader={submissionErrorHeader}
          errorMessage={submissionErrorMessage}
        />
      );
    }
    return null;
  };

  return {
    submissionError,
    submissionErrorHeader,
    submissionErrorMessage,
    setSubmitError,
    resetSubmitError,
    renderErrorAlert,
  };
};
