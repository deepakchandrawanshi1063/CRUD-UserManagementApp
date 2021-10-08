import { useState, useEffect } from "react";
import { Container, Box, Card, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination } from "@mui/material";

import { Edit, Delete, Visibility } from '@mui/icons-material';

import { useForm, Controller } from "react-hook-form";
import { SnackbarProvider,useSnackbar } from 'notistack';

import axios from "axios";

const Homepage = () => {
  const { enqueueSnackbar } = useSnackbar();//notification packege

  //useForm of reacc-hook-form for client side form validation
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { control: control2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm();

  const [reload, setReload] = useState();//for useEffect dependency variable
  const [userData, setUserData] = useState([]);//storing all user data

  //default values for forms
  const user = { name: "", email: "", phone: "", dob: "", gender: "", address: "" }

  //for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  //useEffect 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await axios.get("/api/user/show");
        setUserData(result.data.data);
      } catch (err) {
        console.log(err);
         enqueueSnackbar('Unable to fetch Users details!', { variant:"error" });
      }
    }
    fetchUserDetails();
  }, [reload])


  //after form submission of user registration
  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/api/user/register", data);
      enqueueSnackbar('User added Successfully.', { variant:"success" });
      setReload(result);
      reset(user);
    } catch (err) {
      enqueueSnackbar('Unable to add User!', { variant:"error" });
      console.log(err);
    }
  }


  //after pre-fill form submission of edit user details
  const onUpdateSubmit = async (data) => {
    console.log(data);

    try {
      const result = await axios.put("/api/user/edit", data);
      enqueueSnackbar('User edited sucessfully.', { variant:"success" });
      setReload(result);
      reset2(user);
      handleCloseModel();
    } catch (err) {
      enqueueSnackbar('Unable to edit User details!', { variant:"error" });
      console.log(err);
    }
  }

  //to show a counter value of user serial number
  let id = 0;



  //dialog to view user details
  const [open, setOpen] = useState(false);

  //store single user data 
  const [singleUser, setSingleUser] = useState({ name: "", email: "", phone: "", dob: "", gender: "", address: "" });

  const handleOpen = (data) => {
    setOpen(true);
    setSingleUser(data)
  }
  const handleClose = () => setOpen(false);

  //dialog to edit user data
  const [openModel, setOpenModel] = useState(false);
  // const [singleUser, setSingleUser] = useState({name:"",email:"",phone:"",dob:"",gender:"",address:""});

  const handleOpenModel = (data) => {
    setOpenModel(true);
    console.log(data);
    reset2(data);
  }
  const handleCloseModel = () => setOpenModel(false);


  //delete user by id
  const deleteUser = (async (id) => {
    console.log(id);
    try {
      const result = await axios.delete(`/api/user/delete/${id}`);
      if (result.status === 200) {
        enqueueSnackbar('User deleted successfully.', { variant:"success" });
        setReload(result);
      }

    } catch (err) {
      enqueueSnackbar('Unable to delete User!', { variant:"error" });
      console.log(err);
    }
  }
  )
  return (
    <div style={{ backgroundColor: "#CCCCFF", minHeight: "100vh" }}>
      <Container style={{ paddingTop: "10vh", paddingLeft: "0", paddingRight: "0" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card style={{ padding: "20px", border: "2px solid #1F51FF" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Controller control={control} name="name" render={({ field }) =>
                      <TextField label="Name" fullWidth {...field} error={errors.name} />} rules={{
                        required: { value: true, message: "Name is required" },
                        pattern: { value: /^[a-zA-Z ]{5,25}$/, message: "Enter Valid Name" },
                      }} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control} name="email" render={({ field }) =>
                      <TextField label="Email" fullWidth {...field} error={errors.email}/>}  rules={{
                        required: { value: true, message: "Email is required" },
                        pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Enter Valid Email" },
                      }} />
                      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control} name="phone" render={({ field }) =>
                      <TextField label="Phone" fullWidth {...field} error={errors.phone} />} rules={{
                        required: { value: true, message: "Phone No. is required" },
                        pattern: { value:/^[6-9]\d{9}$/, message: "Enter Valid 10 Digit Phone No." },
                      }} />
                      {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control} name="dob" render={({ field }) => (
                      <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        // defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                        error={errors.dob}
                       
                      />)} rules={{
                        required: { value: true, message: "Date of Birth is required" },
                      }} />
                      {errors.dob && <p style={{ color: "red" }}>{errors.dob.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control} name="address" render={({ field }) => (<TextField label="Address" fullWidth {...field} error={errors.address}/>)}rules={{
                        required: { value: true, message: "Address is required" },
                        pattern: { value:/^[a-zA-Z0-9\s,'-:]*$/, message: "Enter Valid Address" },
                      }} />
                      {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
                  </Grid>

                  <Grid item sm={12}>
                    <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">Gender</FormLabel>
                      <Controller control={control} name="gender" render={({ field }) => <RadioGroup row aria-label="gender" {...field} error={errors.gender} 
                      >
                        <FormControlLabel value="female" name="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" name="male" control={<Radio />} label="Male" />
                      </RadioGroup>} rules={{
                        required: { value: true, message: "Gender is required" },
                      }} />
                      {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} align="right">
                    <Button variant="contained" color="secondary" onClick={() => reset(user)}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" ml={1}>Submit</Button>
                  </Grid>
                  <Grid item sm={12}>

                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
          {/* to view user details in card format */}
            <Card>
              <Typography variant="h5" align="center" py={1} style={{ backgroundColor: "#1F51FF", color: "white", }}>User Details</Typography>
              <TableContainer component={Card}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6" color="primary">Sl. No.</Typography></TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">Name</Typography></TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">Email</Typography></TableCell>
                      <TableCell align="right"><Typography variant="h6" color="primary">Phone</Typography></TableCell>
                      <TableCell align="right"><Typography variant="h6" color="primary">View</Typography></TableCell>
                      <TableCell align="right"><Typography variant="h6" color="primary">Edit</Typography></TableCell>
                      <TableCell align="right"><Typography variant="h6" color="primary">Delete</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{++id}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right"><Tooltip><IconButton color="success" onClick={() => handleOpen(row)}>
                          <Visibility />
                        </IconButton></Tooltip></TableCell>
                        <TableCell align="right"><Tooltip><IconButton color="primary" onClick={() => handleOpenModel(row)}>
                          <Edit />
                        </IconButton></Tooltip></TableCell>
                        <TableCell align="right"><Tooltip><IconButton color="secondary" onClick={() => deleteUser(row._id)}>
                          <Delete />
                        </IconButton></Tooltip></TableCell>
                      </TableRow>
                    )) : null}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>


{/* Dialog to view user details */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          User Details
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Name : {singleUser.name}</Typography>
          <Typography variant="body1">Email : {singleUser.email}</Typography>
          <Typography variant="body1">Phone : {singleUser.phone}</Typography>
          <Typography variant="body1">DOB : {new Date(singleUser.dob).toLocaleDateString()}</Typography>
          <Typography variant="body1">Gender : {singleUser.gender}</Typography>
          <Typography variant="body1">Address : {singleUser.address}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>


{/* dialog to edit user details */}
      <Dialog
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          Edit User Details
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit2(onUpdateSubmit)}>
          <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Controller control={control2} name="name" render={({ field }) =>
                      <TextField label="Name" fullWidth {...field} error={errors.name} />} rules={{
                        required: { value: true, message: "Name is required" },
                        pattern: { value: /^[a-zA-Z ]{5,25}$/, message: "Enter Valid Name" },
                      }} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control2} name="email" render={({ field }) =>
                      <TextField label="Email" fullWidth {...field} error={errors.email}/>}  rules={{
                        required: { value: true, message: "Email is required" },
                        pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Enter Valid Email" },
                      }} />
                      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control2} name="phone" render={({ field }) =>
                      <TextField label="Phone" fullWidth {...field} error={errors.phone} />} rules={{
                        required: { value: true, message: "Phone No. is required" },
                        pattern: { value:/^[6-9]\d{9}$/, message: "Enter Valid 10 Digit Phone No." },
                      }} />
                      {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control2} name="dob" render={({ field }) => (
                      <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        // defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                        error={errors.dob}
                       
                      />)} rules={{
                        required: { value: true, message: "Date of Birth is required" },
                      }} />
                      {errors.dob && <p style={{ color: "red" }}>{errors.dob.message}</p>}
                  </Grid>
                  <Grid item sm={12}>
                    <Controller control={control2} name="address" render={({ field }) => (<TextField label="Address" fullWidth {...field} error={errors.address}/>)}rules={{
                        required: { value: true, message: "Address is required" },
                        pattern: { value:/^[a-zA-Z0-9\s,'-:]*$/, message: "Enter Valid Address" },
                      }} />
                      {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
                  </Grid>

                  <Grid item sm={12}>
                    <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">Gender</FormLabel>
                      <Controller control={control2} name="gender" render={({ field }) => <RadioGroup row aria-label="gender" {...field} error={errors.gender} 
                      >
                        <FormControlLabel value="female" name="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" name="male" control={<Radio />} label="Male" />
                      </RadioGroup>} rules={{
                        required: { value: true, message: "Gender is required" },
                      }} />
                      {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} align="right">
                    <Button variant="contained" color="secondary" onClick={handleCloseModel}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" ml={1}>Submit</Button>
                  </Grid>
                  <Grid item sm={12}>

                  </Grid>
                </Grid>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )

}

export default Homepage;