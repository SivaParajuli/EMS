import React, { useContext, useEffect, useRef, useState } from 'react';
import  styled from '@emotion/styled';
import { Container, Typography, TextField, Button, Paper, createTheme, ThemeProvider } from '@mui/material';
import loginimage from '../images/forlogin.jpg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { RequestParam } from './RequestParam';

const theme = createTheme({
    components:{
      MuiInputBase:{
        styleOverrides:{
          root:{
            fontSize: '14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            '@media screen and (max-width:767px)':{
            height:'45px'
            }
          }
        }
      },MuiBackdrop:{
        styleOverrides:{
          root:{
            background:'none',
            backdropFilter:'none'
          }
        }
      },
      MuiFormLabel:{
        styleOverrides:{
          root:{
            fontSize: '13px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            
          }
        }
      },MuiGrid:{
        styleOverrides:{
          root:{
            padding:'2px'
          }
        }
      },MuiFormControl:{
        styleOverrides:{
          root:{
            marginTop:'6px',
            marginBottom:'10px'
          }
        }
      },
    }
})

const ContainerWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  border-radius: 15px;
  background-color:#fCfCfC;
  z-index:999;
  @media screen and (max-width:767px){
    display:flex;
    flex-direction:column;
    margin-bottom:40px;
  }
`;

const LeftWrapper = styled('div')({
  display:'flex',
  flex:0.55,
  height:'100vh',
  '@media screen and (max-width:767px)':{display: 'none'}
})

const RightWrapper = styled(Container)({
  display:'flex',
  flex:0.45,
  flexDirection:'row',
  justifyContent:'center',
  '@media screen and (max-width:767px)':{marginTop:'70px'}
})

const FormWrapper = styled('form')`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0.5px 10px 0px rgba(0, 0, 0, 0.2);
  @media screen and (max-width:767px){
    display:flex;
    flex-direction:column;
    width: 300px;
  }
`;

const Title = styled(Typography)({
  marginBottom: '16px',
  textAlign: 'center',
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '18px',
  fontWeight:'600'
});

const CustomTextField = styled(TextField)({
    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    fontSize: '15px',
    fontWeight: 'bold',
    });

const SubmitButton = styled(Button)`
  margin-top: 24px;
  background-color: #384E77; /* Update the button background color */
  color: #E6F9AF; /* Set the text color to white */
  &:hover {
  background-color:#384E77; /* Update the button background color on hover */
    color:#E6F9AF;
  }
`;

const LoginPage = () => {

  const navigate = useNavigate();
  const[logindetail,setLoginDetail] = useState({username:"",password:""})
  const [state,setState] = useContext(AuthContext)
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try{
      const url = "http://localhost:8888/login";
      const request = await fetch(url,{
        ...RequestParam,
        method:"POST",
        body:JSON.stringify(logindetail)
      });
      const response = await request.json();
      sessionStorage.setItem("token",JSON.stringify(response.data.token))
      sessionStorage.setItem("isoftype",JSON.stringify(response.data.applicationUserRole))
      setState((prevState)=>{
      return {...prevState,logstate:JSON.parse(sessionStorage.getItem("isoftype"))}})
      navigate("/dashboard/preview")
      console.log(response)
    }catch(error){  
      console.log(error)
    }
  };


    return (
    <ContainerWrapper component="main">
      <LeftWrapper>
      <img src={loginimage} loading='lazy' style={{width:'100%',backgroundSize:'object-fit'}} alt="Login"/>
      </LeftWrapper>
      <RightWrapper>
       <Paper elevation={12} sx={{borderRadius:'15px'}}>
        <ThemeProvider theme={theme}>
      <FormWrapper onSubmit={handleSubmit}>
        <Title variant="h5">Login</Title>
          <CustomTextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="username"
            autoComplete="email"
            margin="normal"
            onChange={(e)=>setLoginDetail((prevState)=> {
              return {...prevState,username : e.target.value}
            })}
            value={logindetail.username}
          />
          <CustomTextField
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            onChange={(e)=>setLoginDetail((prevState)=>{
              return {...prevState,password : e.target.value}
            })}
            value={logindetail.password}
          />
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

            fontSize: '14px',
            fontWeight: 'bold',
          }} 
          color="primary"
        >
          Sign In
        </SubmitButton>
      </FormWrapper>
      </ThemeProvider>
      </Paper> 
      </RightWrapper>
    </ContainerWrapper>
  );
};

export default LoginPage;
