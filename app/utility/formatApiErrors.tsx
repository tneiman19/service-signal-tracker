import { Prisma } from "@prisma/client";

interface ApiErrorResponse {
  errorMessage: string;
  errorCode: string;
}

export default function formatApiErros(error: unknown): ApiErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Clean up the prisma error message
    const lastNewLineIndex: number = error.message.lastIndexOf("\n") + 1;
    const errorMessage: string = error.message.substring(lastNewLineIndex);
    return { errorMessage, errorCode: error.code };
  } else if (error instanceof Error) {
    // Handle generic errors (which include a message property)
    return { errorMessage: error.message, errorCode: "500" };
  } else {
    // Handle cases where error is not an instance of Error
    return { errorMessage: "An unknown error occurred", errorCode: "500" };
  }
}
