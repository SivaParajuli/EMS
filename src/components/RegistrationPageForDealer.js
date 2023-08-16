import React ,{useReducer, useState} from 'react';
import  styled  from '@emotion/styled';
import { Container, Typography, TextField, Button, Grid, Paper, createTheme, ThemeProvider, Snackbar, IconButton } from '@mui/material';
import registerimage from '../images/forlogin.jpg'
import SnackbarComponent from './SnackbarComponent';
import {DealerTextFieldData} from './TableData.js'
import TextFieldComponent from './TextFieldComponent';

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

const initialState = {userName:"",password:"",email:"",city_name:"",mobile_no:"",venueName:""};

const reducer = (dealerdetail , action)=> {
    switch(action.type){
      case "userName":{
        return {...dealerdetail, userName: action.payload}
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
      case "city_name":{
        return {...dealerdetail, city_name: action.payload}
      }
      break;
      case "mobile_no":{
        return {...dealerdetail, mobile_no: action.payload}
      }
      break;
      case "venueName":
        return {...dealerdetail,venueName:action.payload}
        break;
      case "citizenShipNo":
        return {...dealerdetail,citizenShipNo:action.payload}
        break;
      default:
      return dealerdetail
    }
}



const RegistrationPageForDealer = () => {
    const [venueFile, setVenueFile] = useState([]);
    const [dealerdetail,dispatch] = useReducer(reducer,initialState);
    const [open, setOpen] = React.useState(false);
    const[valid,setvalid] = useState(false)

    const handleFileChange = (event) => {
      setVenueFile((prevFile)=> prevFile = event.target.files[0])
      // setSelectedFile((prevState) => {
      // prevState = files
      // return prevState})

    }

    const handleToClose = (event, reason) => {
      if ("clickaway" == reason) return;
      setOpen(false);
    };
    
    console.log(venueFile)


    const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("userName",dealerdetail.userName)
    formData.append("password",dealerdetail.password)
    formData.append("email",dealerdetail.email)
    formData.append("city_name",dealerdetail.city_name)
    formData.append("mobile_no",dealerdetail.mobile_no)
    formData.append("venueName",dealerdetail.venueName)
    formData.append("citizenShipNo",dealerdetail.citizenShipNo)
    // for (let i = 0; i < selectedFile.length; i++) {
    //   formData.append(`image${i}`, selectedFile[i]);
    // }
    formData.append("venueFile",venueFile)

    console.log(formData.get("venueFile"))
    console.log(formData.get("userName"))
    
    try{
      const url = "http://localhost:8888/register/venue";
      const request = await fetch(url,{
        method: "POST", 
        body: formData
      });
      const response = await request.json();
      console.log(response)
      setvalid((prevValue) => prevValue = true)
      setOpen((prevValue) => prevValue = true)
    }catch(error){
      setvalid((prevValue) => prevValue = false)
        setOpen((prevValue) => prevValue = true)
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
      <SnackbarComponent setopen={open} funcopen={setOpen} setvalid={valid}/>
        <Paper elevation={12} sx={{borderRadius:'15px'}}>     
        <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data">
        <Typography variant="h5">Registration for Dealer</Typography>
        <Grid container spacing={1}>
          {DealerTextFieldData.map((item,index)=>
          <Grid item xs={12} lg={6}>
            <TextFieldComponent id={item.id} type={item.type} label={item.label} reducer={""} name={item.name}
              margin={item.margin} setTerm={dispatch} value={dealerdetail[index]}/>
          </Grid>
          )}
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
