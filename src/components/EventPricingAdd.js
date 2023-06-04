import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import { lazy } from 'react';
const EventPriceDetail = lazy(()=> import('./EventPriceDetail'));

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
    }
  }
});

function EventPricingAdd() {
    const[count,setCount] = useState([0]);
    let index = 0;
    
    return (
    <Container style={{position:'relative',display:'flex',flexDirection:'column',gap:'10px'}}>
    <Typography variant='body2' sx={{
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      fontWeight:'600',
    marginBottom:'30px'}}><li sx={{padding:'0px'}}> Set Pricing Detail </li></Typography>
    <AddIcon sx={{position:'absolute', top:'350px',right:'0px',fontSize:50 ,padding:'10px',
    boxShadow:'0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor:'pointer',borderRadius:'50%',backgroundColor:'#5B7B7A',color: "whitesmoke"}} 
    onClick={()=>setCount([...count,index++])}/>
    {count.length > 0 && count.map((item,index)=>(
    <ThemeProvider theme={theme}>
    <EventPriceDetail key={index}/>
    </ThemeProvider>
    ))}
    </Container>
  )
}

export default EventPricingAdd