import { Response } from "express";

// type
type TResponse<T> = {
  statuseCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statuseCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
