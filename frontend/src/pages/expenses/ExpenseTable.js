import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { Skeleton } from "@mui/material";
import PendingExpenseTable from "./PendingExpenseTable";
import RejectedExpenseTable from "./RejectedExpenseTable";
import AcceptedExpenseTable from "./AcceptedExpenseTable";

const ExpenseTable = ({ expenses, loading, type }) => {
  return (
    <>
      {loading ? (
        <TableContainer>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Driver</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {type === "pending" ? (
                  <PendingExpenseTable expenses={expenses} />
                ) : type === "accepted" ? (
                  <AcceptedExpenseTable expenses={expenses} />
                ) : (
                  <RejectedExpenseTable expenses={expenses} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default ExpenseTable;
