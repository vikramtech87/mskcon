import { TransactionStatus } from "./transaction-status";

export type UserTransactionData = {
  transactionId: string;
  transactionStatus: TransactionStatus;
  regsitrationNumber: string;
};
