import {Container,Grid,Card,Button,TextField,Typography} from "@mui/material"
function Login() {
  return (
    <>
     <div style={{backgroundColor:"#0F52BA",height:"100vh"}}>
       <Container maxWidth="xs" style={{paddingTop:"25vh"}}>
       <Card style={{padding:"15px"}}>
         <Grid container spacing={2}>
         <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{color:"#0F52BA"}}>User Login</Typography>
         </Grid>
           <Grid item xs={12}>
             <TextField label="Email" fullWidth />
           </Grid>
           <Grid item xs={12}>
             <TextField label="Password" fullWidth />
           </Grid>
           <Grid item xs={12}>
             <Typography variant="body1" fullWidth align="right" color="primary">Forget Password</Typography> 
           </Grid>
           <Grid item xs={12}>
             <Button  type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
           </Grid>
         </Grid>
         </Card>
       </Container>
     </div>
    </>
  );
}

export default Login;
