import styled from '@emotion/styled';
import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react'


const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
  }
`;

export function DropdownComponentNames({role,setRole,arrayitem,eventDetails}) {
    
    const handleRoleChange = (event) => {
        if(arrayitem !== ""){
        setRole((prevValue)=>({...arrayitem, [event.target.name]:event.target.value}));
        }
    };
    
    const eventNames = Object.keys(eventDetails);
    console.log(eventNames);
    
    return(
          <Grid xs={6} lg={2}>
              <RoleDropdown
              select
              label="EventType"
              InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              name="role"
              InputLabelProps={{
                style: { fontSize: '13px' ,
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              value={role}
              onChange={handleRoleChange}
              variant="outlined"
              required
              > 
              {eventNames.map((item)=>(
              <MenuItem value={item}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}>{item}</MenuItem>
                ))}
            </RoleDropdown>
          </Grid>
  )
}

export function DropdownComponentValues({role,pricing,eventValues,setPricing,arrayitem}) {

    const handlePricing = (event)=> {
      if(arrayitem !== ""){
        setPricing((prevValue)=>({...arrayitem, [event.target.name]:event.target.value}));
        }
    }
    
    console.log(eventValues);
    return (
    <Grid xs={6} lg={2}>
              <RoleDropdown
              select
              disabled={role == "" ? true : false}
              label="Price Range"
              InputProps={{
                style: { fontSize: '14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' ,
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              },
              }}
              name="pricing"
              value={pricing}
              onChange={handlePricing}
              variant="outlined"
              required
              > 
              { role !="" && eventValues.map((value)=>(
              <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }}>Rs{value}</MenuItem>
                    ))
              }
            </RoleDropdown>
          </Grid>
  )
}
