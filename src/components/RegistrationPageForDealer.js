import React ,{useState} from 'react';
import  styled  from '@emotion/styled';
import { Container, Typography, TextField, Button, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
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

const RightWrapper = styled(Container)({
  display:'flex',
  flex:0.5,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center'
})

const FormWrapper = styled('form')`
  width: 100%;
  max-width: 600px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
`;

const FileInputLabel = styled.label({
  display: 'block',
  marginTop: '16px',
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
});

const RegistrationPageForDealer = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here
  };

  return (
    <ThemeProvider theme={theme}>
    <Container disableGutters maxWidth={false}>
      <LeftWrapper>
      <img src={registerimage} loading='lazy' style={{width:'100%',
      backgroundSize:'object-fit'}} alt="Register"/>
      </LeftWrapper>
      <RightWrapper> 
        <Paper elevation={12} sx={{borderRadius:'15px'}}>     
        <FormWrapper onSubmit={handleSubmit} >
        <Typography variant="h5">Registration for Dealer</Typography>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <FileInputLabel>
              Upload venue verification file(PDF or Image):
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                multiple
                required
                
              />
            </FileInputLabel>
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

export default RegistrationPageForDealer;
