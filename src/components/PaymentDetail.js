import { Button, Checkbox, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DateTimePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import {eventNames} from './EventArray'


const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
  }
`;

const CustomTextField = styled(TextField)({
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '15px',
  fontWeight: 'bold',
  });

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
      },MuiGrid:{
        styleOverrides:{
          root:{
            padding:'0px'
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
  
  
export default function PaymentForm() { 

  const [state] = React.useContext(AuthContext);
  const[dropdownValues,setDropdownValues] = React.useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const[bookingDetail,setbookingDetail] = React.useState({bookingDate:dayjs('2023-07-28'),preference:"",requiredCapacity:"",functionType:" "})
  const[isdatevalid,setisdatevalid] = React.useState(true);
  const[booked,setBooked] = React.useState([]);
  const[isvalid,setisvalid] = React.useState(true);
  const[isvalidS,setisvalidS] = React.useState(true);
  const date = new Date();
  const Year = date.getFullYear();
  const Month = date.getMonth()+1;
  const Day = date.getDate();

  
  const config = {      
    headers:{                                                                                                 
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token")),
      "Content-Type" : "application/json"
    }
  }

  const handleDropdownChange = (event)=> {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
}

const eventValuesNext = ()=> {
  for(let item in eventNames){
    if(bookingDetail.functionType == item){
      for(let i in eventNames[item]){
        if(bookingDetail.preference == i){
          return eventNames[item][i]
        }
      }
    }
  }  
}

eventValuesNext()

  
  console.log(bookingDetail.functionType)

  //   React.useEffect(()=>{
  //    async function getBookedDate(){
  //     try{
  //       let response = await fetch(`https://venue-booking-system2.herokuapp.com/client-/bookedDate/${vemail}`,{config});
  //       setBooked(response.data.data)
      
  //       const getDate = booked.filter((item,index)=>{
  //       return item === bookingDetail.bookingDate 
  //     })
  //        if(getDate.includes(bookingDetail.bookingDate)){
  //         setisdatevalid(false)
  //       }else{
  //         setisdatevalid(true)
  //     }
  //       console.log(response)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  //     getBookedDate()
  // },[bookingDetail.bookingDate,isdatevalid])


  //   async function bookNow(){
  //     try{
  //       let response = await fetch(`https://venue-booking-system2.herokuapp.com/client-/book-venue/${vemail}/${email}`
  //       ,{method:"POST",
  //       body:JSON.stringify(bookingDetail),
  //       config}
  //       );
  //       console.log(response);
  //       setbookingDetail(()=>({...bookingDetail,bookingDate:"",requiredCapacity:"",functionType:""}))
  //       navigate(`/cabookingdata/${email}/${getUser.name}`)
  //       window.location.reload();
  //       setisvalidS(false)
  //       const timeId = setTimeout(() => {
  //         setisvalidS(true)
  //       }, 5000)

  //     return () => {
  //     clearTimeout(timeId)
  //     }
      
  //   }catch(err){
  //     console.log(err)
  //    setbookingDetail(()=>({...bookingDetail,bookingDate:"",requiredCapacity:"",functionType:""}))
  //    setisvalid(false)
  //     const timeId = setTimeout(() => {
  //       setisvalid(true)
  //     }, 5000)

  //   return () => {
  //   clearTimeout(timeId)
  //   }
  //   }
  // }
    
    const submitHandler = (e) =>{
    e.preventDefault();
    console.log(bookingDetail,dropdownValues)
     }

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
    <div>
    <form id='venue_booking_form' onSubmit={submitHandler}>
    <Grid container spacing={2} sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          gap:'5px',
          marginTop:'40px',
          marginBottom:'40px'
          }}>
    <Grid item xs={6} lg={4}>
          <DateTimePicker
          label="PickDate"
            disablePast
            required={true}  
            value={bookingDetail.bookingDate}
            onChange={(newValue)=>setbookingDetail({...bookingDetail,bookingDate:newValue})} 
          />
        </Grid>
        <Grid item xs={12} lg={4}>
        <CustomTextField
            variant="outlined"
            required
            fullWidth
            id="capacity"
            label="Capacity"
            type="text"
            name="capacity"
            autoComplete="capacity"
            margin="normal"
            onChange={e=>setbookingDetail({...bookingDetail,requiredCapacity:e.target.value})} 
            value={bookingDetail.requiredCapacity}
          />
          </Grid>
        <Grid item xs={12} lg={4}>
            <RoleDropdown
              select
              InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' ,
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              label="EventType"
              onChange={e=>setbookingDetail({...bookingDetail,functionType:e.target.value})}
              value={bookingDetail.functionType}
              variant="outlined"
              required
              >
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value="PersonalProgram">Personal Program</MenuItem>
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value="FamilyFunction">Family Function</MenuItem>
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value="ProfessionalEvent">Professional Event</MenuItem>
            </RoleDropdown>
          </Grid>

          <Grid item xs={12} lg={4}>
            <RoleDropdown
              select
              InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' ,
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              label="Preference"
              disabled={bookingDetail.functionType == " " ? true : false}
              onChange={e=>setbookingDetail({...bookingDetail,preference:e.target.value})}
              value={bookingDetail.preference}
              variant="outlined"
              required
              >
              
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value="Vegan">Vegan</MenuItem>
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value="NonVegan">Non Vegan</MenuItem>
              
            </RoleDropdown>
          </Grid>

          <Grid item xs={2} lg={4}>
              <FormControl fullWidth>
              <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',
              backgroundColor:'#fff',width:'83px',
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              paddingTop:'3px'}}>Event Types</InputLabel>
              <Select
                labelId="dropdown1-label"
                id="dropdown0"
                name="recipeitem"
                multiple
                required
                InputLabelProps={{
                  style: { fontSize: '13px' ,
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                },
                }}
                variant="outlined"
                disabled={bookingDetail.preference == "" ? true : false}
                value={dropdownValues.recipeitem || []}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(',')}
              >
              { bookingDetail.preference !=""  && eventValuesNext()?.map((value)=>(
             <MenuItem value={`${value}`}>
             <Checkbox checked={dropdownValues[0]?.includes(`${value}`)} />
             <ListItemText primary={`${value}`} />
            </MenuItem>
                    ))
              }
              </Select>
              </FormControl>
              </Grid>

    <div className="book_model_footer ">
      {state.logstate !== null &&( <Button type="submit" sx={{backgroundColor:"#52796F",fontWeight:"600",
        color:"#F1FAEE", borderRadius:"0px",marginLeft:"40px"}} disabled={isdatevalid ? false : true}>Book</Button>)}
      {isdatevalid ?<div> </div>: <abbr>*Date is already Booked</abbr>}
    </div>
    </Grid>
    </form>
    </div>
    </ThemeProvider>
    </LocalizationProvider>
      </>
  )
}