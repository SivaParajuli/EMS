import React,{useReducer} from 'react';
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
          backgroundColor:'#fCfCfC',
          marginBottom:'20px'
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
    },MuiGrid:{
      styleOverrides:{
        root:{
          padding:'0px'
        }
      }
    },
    MuiInputBase:{
      styleOverrides:{
        input:{
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '14px',
          fontWeight:'400',
        },
        root:{
          '@media screen and (max-width:767px)':{
            height:'45px'
            }
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
  height:'100vh',
  '@media screen and (max-width:767px)':{display: 'none'}
})

const RightWrapper = styled('div')({
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  flex:0.5,
  '@media screen and (max-width:767px)':{marginTop:'70px'}
})
const FormWrapper = styled('form')`
  max-width: 600px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
  @media screen and (max-width:767px){
    width:300px;
  }
`;

const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
    margin-top: 16px;
  }
`;

const initialState = {username:"",password:"",email:"",role:"",city_name:"",mobile_no:""};

const reducer = (userdetail , action)=> {
    switch(action.type){
      case "username":{
        return {...userdetail, username: action.payload}
      }
      break;
      case "password":{
        return {...userdetail, password: action.payload}     
       }
      break;
      case "email":{
        return {...userdetail, email: action.payload}
      }
      break;
      case "role":{
        return {...userdetail, role: action.payload}
      }
      break;
      case "address":{
        return {...userdetail, city_name: action.payload}
      }
      break;
      case "contact":{
        return {...userdetail, mobile_no: action.payload}
      }
      break;
      default:
      return userdetail
    }
}

const RegistrationPageForUser = () => {

  const [userdetail, dispatch] = useReducer(reducer,initialState);
  
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
    const url = "http://localhost:8888/register/user";
    const request = await fetch(url,{
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
    body: JSON.stringify(userdetail)
    });
    const response = await request.json();
    console.log(response)
    
  }catch(error){
    console.log(error)
  }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth={false} disableGutters >
      <LeftWrapper>
      <img src={registerimage} loading='lazy' style={{width:'100%',
      backgroundSize:'object-fit'}} alt="Login"/>
      </LeftWrapper>
      <RightWrapper>   
      <Paper elevation={12} sx={{borderRadius:'15px'}}>
      <FormWrapper onSubmit={handleSubmit} >
        <Typography variant="h5">Registration for User</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              type="text"
              label="Username"
              name="username"
              autoComplete="given-name"
              margin="normal"
              onChange={(event)=>dispatch({type:"username",payload:event.target.value})}
              value={userdetail.username}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              type="password"
              label="Password"
              name="password"
              autoComplete="password"
              margin="normal"
              onChange={(event)=>dispatch({type:"password",payload:event.target.value})}
              value={userdetail.password}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
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
              onChange={(event)=>dispatch({type:"email",payload:event.target.value})}
              value={userdetail.email}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RoleDropdown
              select
              label="Role"
              onChange={(event)=>dispatch({type:"role",payload:event.target.value})}
              value={userdetail.role}
              variant="outlined"
              required
              >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
            </RoleDropdown>
          </Grid>
          <Grid item xs={12} lg={6}>
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
              onChange={(event)=>dispatch({type:"address",payload:event.target.value})}
              value={userdetail.city_name}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
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
              onChange={(event)=>dispatch({type:"contact",payload:event.target.value})}
              value={userdetail.mobile_no}
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
