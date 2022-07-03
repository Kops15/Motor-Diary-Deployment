import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Grid,
  Select,
  TableCell,
  TableRow,
  Slide,
  Modal,
  Box,
  Typography,
} from "@material-ui/core";
import {
  CheckCircle as AcceptIcon,
  Cancel as CloseIcon,
  ErrorOutline as RemarkIcon,
  RemoveRedEyeRounded as ViewIcon,
} from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import {
  getExpense,
  updateExpense,
  updateExpenseDepartment,
} from "../../Actions/expenseActions";
import React, { useState } from "react";
import { displayDateFormate } from "../../Services/DateFormate";
import { useDispatch } from "react-redux";
import { AppConst } from "../../constants/appConstants";
import EllipsisText from "react-ellipsis-text";

const states = {
  accepted: "success",
  pending: "warning",
  rejected: "secondary",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const PendingExpenseTable = ({ expenses }) => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [expense, setExpense] = useState("");
  const [statusId, setStatusId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const updateStatus = () => {
    dispatch(updateExpense(expense, status, statusId)).then(() => {
      dispatch(getExpense());
    });
    setShowAlert(false);
  };

  const updateDepartmentHandler = (e, ex) => {
    dispatch(updateExpenseDepartment(ex._id, e.target.value)).then(() => {
      dispatch(getExpense());
    });
  };

  return (
    <>
      {expenses.map((ex, i) => {
        return (
          <>
            {ex.status === "pending" && (
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
                {ex?.department ? (
                  <TableCell>{ex?.department}</TableCell>
                ) : (
                  <TableCell>
                    <FormControl
                      style={{
                        width: "200px",
                      }}
                      variant="outlined"
                    >
                      <InputLabel id="select-label">
                        <em>Choose Department</em>
                      </InputLabel>
                      <Select
                        labelId="select-label"
                        id={`${ex._id}`}
                        label="Choose Department"
                        onChange={(e) => updateDepartmentHandler(e, ex)}
                        autoWidth
                      >
                        <MenuItem value="">
                          <em>Choose Department</em>
                        </MenuItem>
                        {AppConst.DEPARTMENT_LIST.map((d, i) => {
                          return (
                            <MenuItem value={d} key={i}>
                              {d}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </TableCell>
                )}
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                      {" "}
                      <IconButton
                        className={classes.noPadding}
                        onClick={() => {
                          setShowAlert(true);
                          setExpense(ex);
                          setStatus("accepted");
                          setStatusId(ex._id);
                        }}
                      >
                        <AcceptIcon
                          classes={{
                            root: classes[states["accepted"]],
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4}>
                      <IconButton
                        className={classes.noPadding}
                        onClick={() => {
                          setShowAlert(true);
                          setExpense(ex);
                          setStatus("rejected");
                          setStatusId(ex._id);
                        }}
                      >
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

      <Dialog
        onClose={() => setShowAlert(false)}
        open={showAlert}
        TransitionComponent={Transition}
      >
        <DialogTitle>{`Status will be changed to ${status.toUpperCase()}..!!`}</DialogTitle>

        <DialogActions>
          <Button onClick={updateStatus}>OK</Button>
          <Button autoFocus onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingExpenseTable;
