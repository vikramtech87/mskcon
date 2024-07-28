import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionStatus } from "@/lib/transaction-status";
import { UserTransactionData } from "@/lib/userTransactionData";
import { toAmount } from "@/lib/utilfuncs";
import clsx from "clsx";

type TransactionsProps = {
  data: UserTransactionData[];
};

const Transactions = ({ data }: TransactionsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="uppercase font-medium">Transactions</h3>
      <Table>
        <TableCaption>List of your transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            .sort((t1, t2) =>
              t1.transactionStatus < t2.transactionStatus ? -1 : 1
            )
            .map((t) => (
              <TableRow key={t.transactionId}>
                <TableCell>{t.transactionId}</TableCell>
                <TableCell>
                  <Status transactionStatus={t.transactionStatus} />
                </TableCell>
                <TableCell className="text-right">
                  {toAmount(t.amount)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Status = ({
  transactionStatus,
}: {
  transactionStatus: TransactionStatus;
}) => {
  let classList = clsx({
    "text-green-500": transactionStatus === "SUCCESS",
    "font-semibold": true,
    "text-red-500": transactionStatus === "FAILURE",
  });
  return <span className={classList}>{transactionStatus}</span>;
};

export default Transactions;
