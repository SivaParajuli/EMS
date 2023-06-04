import React,{Suspense, useState} from 'react';
import  styled  from '@emotion/styled';
import { Container, Typography, TextField, Button, Grid,MenuItem, Paper, createTheme, ThemeProvider } from '@mui/material';
import registerimage from '../images/forlogin.jpg'


const theme = createTheme({
  components:{
    MuiContainer:{
      styleOverrides:{
        root:{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'center',
          borderRadius: '15px',       
          backgroundColor:'#fCfCfC'
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          marginBottom: '16px',
          textAlign: 'center',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '20px',
          fontWeight:'500'
        }
      }
    },
    MuiFormLabel:{
      styleOverrides:{
        root:{
          fontSize: '13px' ,  
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        }
      }
    },
    MuiInputBase:{
      styleOverrides:{
        input:{
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '14px',
          fontWeight:'400'
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '24px',
          backgroundColor: '#384E77', 
          color: '#E6F9AF', 
          "&:hover": {
          backgroundColor: '#384E77', 
          color:'#E6F9AF'
        }
      }
    }
  },
  MuiMenuItem:{
    styleOverrides:{
      root:{
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        fontSize: '14px',
      }
    }
  },
  MuiSelect:{
    styleOverrides:{
      select:{
        height:'15px'
      }
    }
  }
}
});

const LeftWrapper = styled('div')({
  display:'flex',
  flex:0.5,
  height:'100vh'
})

const RightWrapper = styled('div')({
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  flex:0.5,
})
const FormWrapper = styled('form')`
  max-width: 600px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
`;

const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
    margin-top: 16px;
  }
`;

const RegistrationPageForUser = () => {

  const [role, setRole] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth={false} disableGutters>
      <LeftWrapper>
      <img src={registerimage} loading='lazy' style={{width:'100%',
      backgroundSize:'object-fit'}} alt="Login"/>
      </LeftWrapper>
      <RightWrapper>   
      <Paper elevation={12} sx={{borderRadius:'15px'}}>
      <FormWrapper onSubmit={handleSubmit} >
        <Typography variant="h5">Registration for User</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstName"
              type="text"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              type="text"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              margin="normal"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <RoleDropdown
              select
              label="Role"
              value={role}
              onChange={handleRoleChange}
              variant="outlined"
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
            </RoleDropdown>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              type="text"
              label="Address"
              name="address"
              autoComplete="address"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phoneNumber"
              type="number"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">Register</Button>
      </FormWrapper>
      </Paper> 
      </RightWrapper>
    </Container>
    </ThemeProvider>
  );
};

export default RegistrationPageForUser;
