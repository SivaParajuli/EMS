import React, { useContext, useState } from 'react';
import  styled from '@emotion/styled';
import { Container, Typography, TextField, Button, Paper, createTheme, ThemeProvider } from '@mui/material';
import loginimage from '../images/forlogin.jpg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SnackbarComponent from './SnackbarComponent';
import TextFieldComponent from './TextFieldComponent';


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
  border-radius: 15px;
  background-color:#fCfCfC;
  position:relative;
  height:550px;
  @media screen and (max-width:767px){
    display:flex;
    flex-direction:column;
    margin-bottom:40px;
  }
`;

const LeftWrapper = styled('div')({
  display:'flex',
  flex:0.55,
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
  const [open, setOpen] = useState(false);
  const[valid,setvalid] = useState(false)
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const url = "http://localhost:8888/login";
      const request = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(logindetail)
        });
      const response = await request.json();
      if(response.status == true){
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("isoftype",JSON.stringify(response.data.applicationUserRole))
        sessionStorage.setItem("email",JSON.stringify(response.data.email))
        setvalid((prevValue) => prevValue = true)
        setOpen((prevValue) => prevValue = true)
        setState((prevState)=>{
        return {...prevState,logstate:JSON.parse(sessionStorage.getItem("isoftype"))}})
        setTimeout(()=>{navigate(`/dashboard/preview/`)},4000) 
      }else{
        alert("Invalid Login!")
      }
      }catch(error){ 
        setvalid((prevValue) => prevValue = false) 
        setOpen((prevValue) => prevValue = true)
    }
  };


    return (
    <ContainerWrapper component="main">
      <LeftWrapper>
      <img src={loginimage} loading='lazy' style={{width:'100%',backgroundSize:'object-fit'}} alt="Login"/>
      </LeftWrapper>
      <RightWrapper>
        <SnackbarComponent setopen={open} funcopen={setOpen} setvalid={valid}/>
       <Paper elevation={12} sx={{borderRadius:'15px'}}>
        <ThemeProvider theme={theme}>
      <FormWrapper onSubmit={handleSubmit}>
        <Title variant="h5">Login</Title>
          <TextFieldComponent id={"email"} type={"email"} label={"Email"} 
            value={logindetail.username} arrayitem={logindetail} setTerm={setLoginDetail} name={"username"}/>
          <TextFieldComponent id={"password"} type={"password"} label={"Password"} 
            value={logindetail.password} arrayitem={logindetail} setTerm={setLoginDetail} name={"password"}/>
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
