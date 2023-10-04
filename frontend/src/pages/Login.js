import * as React from 'react';
import "../css/login.css";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Login() {
  return (
    // <div>
    //   <button onClick={() => window.location.href='/auth/google'}>Login with Google</button>
    //   <button onClick={() => window.location.href='/auth/facebook'}>Login with Facebook</button>
    // </div>
    <div className="container">
      <div className="login">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="filled-basic" label="Username or email" variant="filled" />
          <TextField id="filled-basic" label="Password" variant="filled" />
          <Button variant="contained" style={{backgroundColor: '#fa7070', color: '#fff'}}>Log in</Button>
        </Box>
      </div>
    </div>
  );
}

export default Login;
