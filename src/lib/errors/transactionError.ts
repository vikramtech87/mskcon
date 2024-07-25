export type TransactionErrorCode =
  | "transaction-data/fetch-error"
  | "transaction-gateway/fetch-error"
  | "transaction-update/overwrite-error"
  | "transaction-update/failed-update";

export class TransactionError extends Error {
  code: TransactionErrorCode;

  constructor(code: TransactionErrorCode) {
    super(code);
    this.code = code;
  }
}
