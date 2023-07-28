import styled from '@emotion/styled';
import { Button, Checkbox, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React,{useState} from 'react'
import {eventNames} from './EventArray'
import { Form } from 'react-router-dom';

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

function EventPriceDetail() {
    const [role, setRole] = useState("");
    const [priceValue,setPriceValue] = useState("");
    const[pref,setPref] = useState("");
    const[dropdownValues,setDropdownValues] = useState({});
    const[personNum,setPersonNum] = useState("");

    const handleEventPriceSubmit = (e)=> {
      e.preventDefault();
      console.log({role,pref,dropdownValues,priceValue})
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
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
        if(role == item){
          return Object.keys(eventNames[item])
        }
      }
    }
    
    const eventValuesNext = ()=> {
      for(let item in eventNames){
        if(role == item){
          for(let i in eventNames[item]){
            if(pref == i){
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
              value={role}
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
              disabled={role == "" ? true : false}
              label="Preference"
              name="preference"
              sx={{cursor: role == "" ? 'not-allowed' : 'pointer'}}
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
              value={pref}
              onChange={(e)=>setPref(e.target.value)}
              variant="outlined"
              required
              > 
              { role !="" && eventValues().map((value)=>(
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
                disabled={pref == "" ? true : false}
                value={dropdownValues.recipeitem || []}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(',')}
              >
              { pref !=""  && EventService.map((value)=>(
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
              <TextField
              type="number"
              label="PriceValue"
              name="textField1"
              value={priceValue}
              onChange={(e)=>setPriceValue(e.target.value)}
              fullWidth
              required
              />
              </Grid>
              <Grid xs={2}>
              <TextField
              type="number"
              label="Guests"
              name="textField2"
              value={personNum}
              onChange={(e)=>setPersonNum(e.target.value)}
              fullWidth
              required
              />
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