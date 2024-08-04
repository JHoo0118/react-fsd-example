import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ZodIssue } from "zod";

export class AxiosValidationError<T = unknown, D = any> extends AxiosError {
  static readonly ERR_BAD_VALIDATION = "ERR_BAD_VALIDATION";

  constructor(
    config?: InternalAxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>,
    readonly errors?: ZodIssue[],
  ) {
    super(
      "잘못된 데이터입니다.",
      AxiosValidationError.ERR_BAD_VALIDATION,
      config,
      request,
      response,
    );
  }
}
