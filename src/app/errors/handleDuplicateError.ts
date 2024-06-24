/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const hndaleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quptes using regex
  const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate Key Error",
    errorSources,
  };
};

export default hndaleDuplicateError;
