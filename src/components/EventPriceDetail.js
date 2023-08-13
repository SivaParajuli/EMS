import styled from '@emotion/styled';
import { Button, Checkbox, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React,{useState} from 'react'
import {eventNames} from './EventArray'
import { Form } from 'react-router-dom';
import { Category } from '@mui/icons-material';

const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
  }
`;

const theme = createTheme({
  components:{
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
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        },
      },
    },MuiTypography:{
      styleOverrides:{
        root:{
          fontSize:'14px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        }
      }
    },MuiSvgIcon:{
      styleOverrides:{
        root:{
          fontSize:'20px'
        }
      }
    }
  }
});


const EventService = ["Starter","Launch","Dinner","Dessert"]
const GuestRange = ["100-200","200-300","300-400","400-500","500-600","600-700","700-800","800-900","900-1000"]
const PriceRange = ["50000-75000","75000-100000","100000-125000","125000-150000","150000-175000","175000-200000"]

function EventPriceDetail() {
    const [functionName, setFunctionName] = useState("");
    const [price,setPriceValue] = useState("");
    const[preference,setPref] = useState("");
    const[dropdownValues,setDropdownValues] = useState({});
    const[guest,setPersonNum] = useState("");

    const handleEventPriceSubmit = async(e)=> {
      e.preventDefault();
      try{
        const request = await fetch(`http://localhost:8888/venue-/updatePricing/${JSON.parse(sessionStorage.getItem("email"))}`,
        {
          method: "POST", 
          headers: {
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token")),
          "Content-Type": "application/json"
          },
          body: JSON.stringify({functionName,price,preference,guest,...dropdownValues})
          }
        )
        const response = await request.json()
        console.log(response)
      }catch(error){
        console.log(error)
      }
      console.log({functionName,price,preference,guest,...dropdownValues})
    }

    const handleRoleChange = (event) => {
        setFunctionName(event.target.value);
    };

    const handleDropdownChange = (event)=> {
        setDropdownValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: event.target.value,
        }));
    }

    console.log(dropdownValues)

    const eventValues = ()=> {
      for(let item in eventNames){
        if(functionName == item){
          return Object.keys(eventNames[item])
        }
      }
    }
    
    const eventValuesNext = ()=> {
      for(let item in eventNames){
        if(functionName == item){
          for(let i in eventNames[item]){
            if(preference == i){
              return eventNames[item][i]
            }
          }
        }
      }  
    }

    eventValuesNext()

    return (
      <ThemeProvider theme={theme}>
        <Form onSubmit={handleEventPriceSubmit}>
        <Grid container spacing={1} sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px',marginLeft:'1px',marginBottom:'15px'}}>
        <Grid xs={2}>
              <RoleDropdown
              select
              label="EventType"
              InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }
              }}
              InputLabelProps={{
                style: { fontSize: '13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              },
              }}
              value={functionName}
              onChange={handleRoleChange}
              variant="outlined"
              required
              >                                       
              {Object.keys(eventNames).map((item)=>(
              <MenuItem value={item} required
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{item}</MenuItem>
                ))}
            </RoleDropdown>
          </Grid>
          <Grid xs={2}>
          <RoleDropdown
              select
              disabled={functionName == "" ? true : false}
              label="Preference"
              name="preference"
              sx={{cursor: functionName == "" ? 'not-allowed' : 'pointer'}}
              value={preference}
              onChange={(e)=>setPref(e.target.value)}
              variant="outlined"
              required
              > 
              { functionName !="" && eventValues().map((value)=>(
                        <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{value}</MenuItem>
                    ))
              }
              </RoleDropdown>
              </Grid>
              <Grid xs={2} >
              <FormControl fullWidth>
              <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',
              backgroundColor:'#fff',width:'83px',
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              paddingTop:'3px'}}>Category</InputLabel>
              <Select
                labelId="dropdown1-label"
                id="dropdown0"
                name="recipe"
                multiple
                required
                variant="outlined"
                disabled={preference == "" ? true : false}
                value={dropdownValues.recipe || []}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(',')}
              >
              { preference !=""  && EventService.map((value)=>(
             <MenuItem value={`${value}`}>
             <Checkbox checked={dropdownValues[0]?.includes(`${value}`)} />
             <ListItemText primary={`${value}`} />
            </MenuItem>
                    ))
              }
              </Select>
              </FormControl>
              </Grid>
              <Grid xs={2}>
          <RoleDropdown
              select
              disabled={dropdownValues?.recipe ? false : true}
              label="GuestRange"
              name="guest"
              sx={{cursor: dropdownValues?.recipe == "" ? 'not-allowed' : 'pointer'}}
              value={guest}
              onChange={(e)=>setPersonNum(e.target.value)}
              variant="outlined"
              required
              > 
              { dropdownValues?.recipe && GuestRange.map((value)=>(
                        <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{value}</MenuItem>
                    ))
              }
              </RoleDropdown>
              </Grid>
              <Grid xs={2}>
              <RoleDropdown
              select
              disabled={guest == "" ? true : false}
              label="PriceRange"
              name="price"
              sx={{cursor: guest == "" ? 'not-allowed' : 'pointer'}}
              value={price}
              onChange={(e)=>setPriceValue(e.target.value)}
              variant="outlined"
              required
              > 
              { guest !="" && PriceRange.map((value)=>(
                        <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{value}</MenuItem>
                    ))
              }
              </RoleDropdown>
              </Grid>
              <Button type="submit"
                  sx={{":hover":{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001'},
                  fontWeight:'550',height:'100%',
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                  backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001',borderRadius:'20px'}}
                  >
                    Submit
                  </Button>
          </Grid>
          </Form>
    </ThemeProvider>
  )
}

export default EventPriceDetail