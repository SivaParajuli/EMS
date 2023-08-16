import React,{useContext, useState} from 'react';
import { lazy } from 'react';
import dayjs from 'dayjs';
import { Button, Container,Typography} from '@mui/material'
import  styled  from '@emotion/styled';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AuthContext } from '../context/AuthContext';
import DatePickerComponent from './DatePickerComponent';
import TextFieldComponent from './TextFieldComponent';
import { Form } from 'react-router-dom';
const DropdownComponentNames = lazy(()=> import("./DropdownComponent").then(module=>{
  return { default: module.DropdownComponentNames}
}));
const DropdownComponentValues = lazy(()=>import("./DropdownComponent").then(module=>{
  return { default: module.DropdownComponentValues}
}));
const GridItemsExplorePage = lazy(()=> import('./GridItemsExplorePage'));

const nextMonth = dayjs().add(30,'day');
const tomorrow = dayjs().add(1,'day');

const SubmitButton = styled(Button)`
  background-color: #384E77; /* Update the button background color */
  color: #E6F9AF; /* Set the text color to white */
  &:hover {
    background-color: #384E77; /* Update the button background color on hover */
    color:#E6F9AF;
  }
  width:8%;
  @media screen and (max-width:767px){
    width:50%;
  }
`;


const EventDetails = {
  "ProfessionalEvent":["5000","200000","400000","600000","800000","1000000"],
  "FamilyFunction":["400000","600000","800000","1000000","1200000"],
  "PersonalProgram":["50000","100000","200000","300000","400000"]
}

const theme = createTheme({
  components:{
    MuiTypography:{
      styleOverrides:{
        root:{
          fontSize:'18px',
          fontFamily: 'Lato, sans-serif',
          fontFamily: 'Montserrat, sans-serif'
        }
      }
    },
      MuiInputLabel:{
      styleOverrides: {
        root: {
          fontSize:'13px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          paddingTop:'3px'
        },
      },
    },
    MuiInputBase:{
      styleOverrides: {
        root: {
          height:'45px',
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        },
      },
    },MuiPopper:{
      styleOverrides: {
        root: {
          '& .MuiPickersCalendarHeader-label':{
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:'500'
        },
        '& .MuiPickersMonth-monthButton':{
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:'500'
        },
        '& .MuiPickersYear-yearButton':{
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:'500'
        }
      },
    },
  },MuiGrid:{
    styleOverrides:{
      root:{
        '& .MuiFormControl-root':{
          margin:'0px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        }
      }
    }
  },MuiButtonBase:{
    styleOverrides:{
      root:{

        fontFamily:"Montserrat, sans-serif",
        padding:"7px 10px",
        "&:hover":{
          backgroundColor:"#f0f0f0",
          color:"#2F3E46"
        }
      }
    }
  }
  },
});



const ExploreSectionComponent = ()=> {

  const[valid,setvalid] = React.useState(false)
  const[searchfilter,setSearchFilter] = useState({searchTerm:"",role:"",pricing:""})
  const[startingDate,setStartingDate] = useState(dayjs("2023-08-20"))
  const[endingDate,setEndingDate] = useState(dayjs("2023-09-20"))

  const [state] = useContext(AuthContext);
  let extrabutton;
  
  switch(state.logstate){
    case "CLIENT":
      extrabutton={
        buttonav:<Typography sx={{fontSize:"10px",fontWeight:"bold"}}>Available</Typography>
      }
      break;
      case null:
      extrabutton={
         
        }
        break;
      default:
      break;
  }
	

  const filterEventValue = ()=>{
    for(let item in EventDetails){
        if(item == searchfilter?.role){
            return EventDetails[item]
        }
    }
  }
  console.log(filterEventValue())

  
  const handleSubmit = ()=> {
    console.log(searchfilter)
  }


  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
        <Container sx={{position:"relative"}}  disableGutters maxWidth={false}>
          <Form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          gap:'5px',marginTop:'40px',
          marginBottom:'40px'
          }}>
          <Grid xs={6} lg={2}>
          <DatePickerComponent label={"StartingDate"} value={startingDate} 
          setTerm={setStartingDate} setClick={setvalid}/>
          </Grid>
          <Grid xs={6} lg={2}>
          <DatePickerComponent label={"EndingDate"} value={endingDate} 
          setTerm={setEndingDate} setClick={setvalid}/>
          </Grid>
          <Grid xs={6} lg={2}>
          <TextFieldComponent id={"location"} type={"text"} label={"Location"} 
          value={searchfilter.searchTerm} arrayitem={searchfilter} setTerm={setSearchFilter} name={"searchTerm"}/>
          </Grid>
          <DropdownComponentNames arrayitem={searchfilter} role={searchfilter.role} 
          eventDetails={EventDetails} setRole={setSearchFilter}/>
          <DropdownComponentValues arrayitem={searchfilter} role={searchfilter.role} pricing={searchfilter.pricing} 
          eventValues={filterEventValue()} setPricing={setSearchFilter}/>
          <SubmitButton type="submit" fullWidth variant="contained" sx={{
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          }} color="primary">
          Search
        </SubmitButton>
        </Grid>
        </Form>
        <GridItemsExplorePage extraprops={extrabutton}/>
        </Container>
        </ThemeProvider>
    </LocalizationProvider>
  );
};

export default ExploreSectionComponent