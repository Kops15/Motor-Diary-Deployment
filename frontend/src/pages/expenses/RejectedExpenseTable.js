import {
  IconButton,
  Grid,
  TableCell,
  TableRow,
  Typography,
  Modal,
  Box,
} from "@material-ui/core";
import {
  Cancel as CloseIcon,
  RemoveRedEyeRounded as ViewIcon,
} from "@material-ui/icons";
import useStyles from "../dashboard/styles";

import EllipsisText from "react-ellipsis-text";
import React, { useState } from "react";
import { displayDateFormate } from "../../Services/DateFormate";

const states = {
  accepted: "success",
  pending: "warning",
  rejected: "secondary",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const RejectedExpenseTable = ({ expenses }) => {
  var classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  return (
    <>
      {expenses.map((ex, i) => {
        return (
          <>
            {ex.status === "rejected" && (
              <TableRow key={i}>
                <TableCell>
                  {ex.driver?.firstName} {ex.driver?.lastName}{" "}
                </TableCell>
                <TableCell>{displayDateFormate(ex.date)}</TableCell>

                {ex.expenseType.length > 20 ? (
                  <TableCell>{ex.expenseType.slice(0, 20)}...</TableCell>
                ) : (
                  <TableCell>{ex.expenseType}</TableCell>
                )}
                <TableCell>{ex.expenseAmount}</TableCell>

                <TableCell>{ex?.department}</TableCell>
                <TableCell>
                  <EllipsisText text={ex?.expenseRemark} length={20} />
                </TableCell>
                <TableCell>
                  {/**/}

                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={6}>
                      {" "}
                      <IconButton
                        className={classes.noPadding}
                        onClick={() => {
                          setModalImage(ex);
                          setShowModal(true);
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton className={classes.noPadding}>
                        <CloseIcon
                          classes={{
                            root: classes[states["rejected"]],
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            )}
          </>
        );
      })}
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <Typography
                style={{
                  margin: "6px",
                  fontWidth: "bold",
                  position: "sticky",
                }}
              >
                <CloseIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setShowModal(false)}
                />
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
              paddingBottom: "2%",
            }}
          >
            <Grid>
              <Typography variant="h4">Expense Receipt</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid>
              <img
                alt=""
                style={{ height: "400px", width: "400px" }}
                src={`${modalImage.expenseReceiptImage}`}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default RejectedExpenseTable;
