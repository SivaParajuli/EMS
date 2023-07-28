import React,{useMemo, useState} from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Grid, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Form } from 'react-router-dom';

const arrayofeventdetail = {

  "Program":
  ["Event Hall with Dining",
  "Multiple Rooms with Spa Pool(B:L:D)",
  "Bbq and Dance Live Event",
  "Parking Space and Security",
  "Green Environment",
  "Sport Hall and Games",
  "Event Hall and Mandap",
  "Launch Snacks Beverages",
  "Dancing Space and Sound System",
  "Green Environment",
  "Parking Space and Security",
  "Necessary Digital Systems",
  "Launch Snacks Beverages",
  "Parking Space and Security",
  "Vibrant and Audible Hall"
  ]

} 

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
  
  const UpperSectionWrapper = styled('div')({
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    marginTop:'15px'
  }) 

function EventServiceEventDetail() {
    const [textValues, setTextValues] = useState({});
    const [dropdownValues, setDropdownValues] = useState({});

    const handleTextChange = (event) => {
        setTextValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: event.target.value,
        }));
        
      };
    
      const handleDropdownChange = (event) => {
        setDropdownValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: event.target.value,
        }));
        
      };

      console.log(dropdownValues)
      
  return (
    <UpperSectionWrapper>
      <Form onSubmit={console.log("Hello World")}>
      <Typography variant='body2' sx={{  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      fontWeight:'600'}}>
      <li sx={{padding:'0px'}}>Add Event Detail</li></Typography>
     <Grid container spacing={1} sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'15px'}}>
     <Grid item xs={2}>
    <ThemeProvider theme={theme}>
    <TextField
      label="Capacity(In Person)"
      name="textField1"
      value={textValues.textField1 || ''}
      onChange={handleTextChange}
      fullWidth
      required
      margin="normal"
    />
    </ThemeProvider>
    </Grid>
    <Grid item xs={2}>
    <ThemeProvider theme={theme}>
    <TextField
      label="Available Rooms"
      name="textField2"
      value={textValues.textField2 || ''}
      onChange={handleTextChange}
      fullWidth
      required
      margin="normal"
    />
    </ThemeProvider>
    </Grid>
    <Grid item xs={2}>
    <ThemeProvider theme={theme}>
    <FormControl fullWidth margin="normal">
      <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',backgroundColor:'#fff',width:'83px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        paddingTop:'3px'}}>Event Types</InputLabel>
      <Select
        labelId="dropdown0-label"
        id="dropdown0"
        name="dropdown0"
        multiple
        required
        value={dropdownValues.dropdown0 || []}
        onChange={handleDropdownChange}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem value="PersonalProgram">
          <Checkbox checked={dropdownValues[0]?.includes('PersonalProgram')} />
          <ListItemText primary="Personal Program" />
        </MenuItem>
        <MenuItem value="FamilyFunction">
          <Checkbox checked={dropdownValues[0]?.includes('FamilyFunction')} />
          <ListItemText primary="Family Function" />
        </MenuItem>
        <MenuItem value="ProfessionalEvent">
          <Checkbox checked={dropdownValues[0]?.includes('ProfessionalEvent')} />
          <ListItemText primary="Professional Event" />
        </MenuItem>
      </Select>
    </FormControl>
    </ThemeProvider>
    </Grid>
    <ThemeProvider theme={theme}>
    <Grid item xs={2}>
    <FormControl fullWidth margin="normal">
      <InputLabel id={`dropdown1-label`}
      sx={{fontSize:'13px',backgroundColor:'#fff',width:'140px',paddingLeft:'4px',
      fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        paddingTop:'3px'}}>For Programs</InputLabel>
        <Select
        id={`dropdown1`}
        name={`dropdown1`}
        multiple
        required
        value={dropdownValues.dropdown1 || []}
        onChange={handleDropdownChange}
        renderValue={(selected) => selected.join(',')}
        >
        {arrayofeventdetail.Program.map((item)=>( 
        <MenuItem value={`${item}`}>
          <Checkbox checked={dropdownValues[1]?.includes(`${item}`)} />
          <ListItemText primary={`${item}`} />
        </MenuItem> ))
         }
      </Select>
    </FormControl>
    </Grid>
    </ThemeProvider>
    <Button type="submit"
                  sx={{":hover":{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001'},
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                  fontWeight:'550',height:'100%',marginTop:'15px', boxShadow:'0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.3)',   
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001',borderRadius:'20px'}}
                  >
                    Submit
                  </Button>
    </Grid>
    </Form>
    </UpperSectionWrapper>
  )
}

export default EventServiceEventDetail