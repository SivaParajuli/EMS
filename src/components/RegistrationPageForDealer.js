import React ,{useReducer, useState} from 'react';
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
          backgroundColor:'#fCfCfC',
          marginBottom:'10px'
        }
      }
    },MuiGrid:{
      styleOverrides:{
        root:{
          padding:'0px'
        }
      }
    },MuiFormControl:{
      styleOverrides:{
        root:{
          marginTop:'4px',
          marginBottom:'5px'
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

const RightWrapper = styled(Container)({
  display:'flex',
  flex:0.5,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  '@media screen and (max-width:767px)':{marginTop:'70px'}
})

const FormWrapper = styled('form')`
  width: 100%;
  max-width: 600px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 15px;
  @media screen and (max-width:767px){
    width:300px;
  }
`;

const FileInputLabel = styled.label({
  display: 'block',
  marginTop: '16px',
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  '@media screen and (max-width:767px)':{
    
    }
});

const initialState = {username:"",password:"",email:"",city_name:"",mobile_no:""};

const reducer = (dealerdetail , action)=> {
    switch(action.type){
      case "username":{
        return {...dealerdetail, username: action.payload}
      }
      break;
      case "password":{
        return {...dealerdetail, password: action.payload}     
       }
      break;
      case "email":{
        return {...dealerdetail, email: action.payload}
      }
      break;
      case "address":{
        return {...dealerdetail, city_name: action.payload}
      }
      break;
      case "contact":{
        return {...dealerdetail, mobile_no: action.payload}
      }
      break;
      default:
      return dealerdetail
    }
}



const RegistrationPageForDealer = () => {
    const [selectedFile, setSelectedFile] = useState([]);
    const formData = new FormData();
    const [dealerdetail,dispatch] = useReducer(reducer,initialState);
    

    const handleFileChange = (event) => {
      const files = event.target.files;
      const selectedfilelist = Array.from(files);
      setSelectedFile((prevState) => {return prevState = selectedfilelist})
      
      for (let i = 0; i <= selectedfilelist.length; i++) {
        formData.append(`image${i}`, selectedfilelist[i]);
      }
      
    };

    
    const handleSubmit = async(event) => {
    event.preventDefault();
    formData.append("data",dealerdetail)
    try{
      const url = "http://localhost:8888/register/venue";
      const request = await fetch(url,{
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          'Content-Type': "multipart/form-data"
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
        body: formData
      });
      const response = await request.json();
      console.log(response)

    }catch(error){
      console.log(error)
    }
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
        <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data">
        <Typography variant="h5">Registration for Dealer</Typography>
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
              value={dealerdetail.username}
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
              value={dealerdetail.password}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
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
              value={dealerdetail.email}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              type="text"
              label="Address"
              name="city_name"
              autoComplete="city_name"
              margin="normal"
              onChange={(event)=>dispatch({type:"address",payload:event.target.value})}
              value={dealerdetail.city_name}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="contact"
              type="number"
              label="Contact"
              name="mobile_no"
              autoComplete="tel"
              margin="normal"
              onChange={(event)=>dispatch({type:"contact",payload:event.target.value})}
              value={dealerdetail.mobile_no}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
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
