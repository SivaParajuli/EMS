import React, { useContext } from 'react';
import  styled from '@emotion/styled';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import loginimage from '../images/forlogin.jpg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const ContainerWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  border-radius: 15px;
  background-color:#fCfCfC;
`;

const LeftWrapper = styled('div')({
  display:'flex',
  flex:0.55,
  height:'100vh'
})

const RightWrapper = styled(Container)({
  display:'flex',
  flex:0.45,
  flexDirection:'row',
  justifyContent:'center'
})

const FormWrapper = styled('form')`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
  // box-shadow: 0px 0.5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled(Typography)({
  marginBottom: '16px',
  textAlign: 'center',
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '18px',
  fontWeight:'600'
});

const Content = styled.div`
  font-size: 14px;
`;

const CustomTextField = styled(TextField)({
    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    fontSize: '15px',
    fontWeight: 'bold'
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
  const [state,setState] = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    setState({...state,isofType:"ADMIN"})
    navigate("/dashboard/preview")
  };

  return (
    <ContainerWrapper component="main">
      <LeftWrapper>
      <img src={loginimage} loading='lazy' style={{width:'100%',backgroundSize:'object-fit'}} alt="Login"/>
      </LeftWrapper>
      <RightWrapper>
       <Paper elevation={12} sx={{borderRadius:'15px'}}>
      <FormWrapper onSubmit={handleSubmit}>
        <Title variant="h5">Login</Title>
        <Content>
          <CustomTextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              },
                inputProps: { style: { fontSize: '14px' } }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' ,
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              },
              }}
            name="email"
            autoComplete="email"
            margin="normal"
          />
          <CustomTextField
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              },
                inputProps: { style: { fontSize: '14px' } }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' ,fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
            name="password"
            
            autoComplete="current-password"
            margin="normal"
          />
        </Content>
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
      </Paper> 
      </RightWrapper>
    </ContainerWrapper>
  );
};

export default LoginPage;
