export type WorkshopErrorCode =
  | "workshop-error/fetch-error"
  | "workshop-error/not-exists"
  | "workshop-error/update-error";

export class WorkshopError extends Error {
  code: WorkshopErrorCode;

  constructor(code: WorkshopErrorCode) {
    super(code);
    this.code = code;
  }
}
