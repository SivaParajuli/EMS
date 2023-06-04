import React,{useState} from 'react'
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Grid, Typography, Button} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Form } from 'react-router-dom';

const arrayofrecipedetail = {
    "PersonalProgram":[
        "Mashed Potato Chilly",
        "Beans Pickle Chilly",
        "Potato Ball","Samosa Chat",
        "Paneer Chilly","Fried Veg Curry",
        "With Drinks(Soft Hard)",
        "Candle Night Special","Fruit Salad",
        "Barbq and Drinks",
        "Momo and Pizza",
        "Fish Curry Chilly",
        "Drumstick and Prawn",
        "Biryani Steamed",
        "Candle Night Special",
        "Thakali Set","Soup Items","Sweet Items"
      ]
    ,"FamilyFunction":[
        "Mashed Potato Chilly",
        "Beans Pickle Chilly",
        "Potato Ball","Samosa Chat",
        "Paneer Chilly","Fried Veg Curry",
        "Barbq and Drinks",
        "Momo and Pizza",
        "Fish Curry Chilly",
        "Drumstick and Prawn",
        "Dinner Set",
        "Fruit Salad",
        "Cake","Soup Items",
        "Sweet Items"
    ]
    ,"ProfessionalEvent":[
        "Cake",
        "Mashed Potato Chilly",
        "Beans Pickle Chilly",
        "Potato Ball","Samosa Chat",
        "Paneer Chilly","Fried Veg Curry",
        "Barbq and Drinks",
        "Momo and Pizza",
        "Fish Curry Chilly",
        "Drumstick and Prawn",
        "Dinner Set",
        "Fruit Salad",
        "Thakali Set","Soup Items","SweetItems"
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
  
  const LowerSectionWrapper = styled('div')({
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    marginTop:'5px'
  })

export default function EventServiceRecipeDetail(){

    
    const [dropdownValues, setDropdownValues] = useState({});

      const handleDropdownChange = (event) => {
        setDropdownValues((prevValues) => ({
          ...prevValues,
          [event.target.name]: event.target.value,
        }));
      };

      return(
      <LowerSectionWrapper>
        <Form onSubmit={()=>console.log("hello")}>
      <Typography variant='body2' sx={{  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      fontWeight:'600'}}>
      <li sx={{padding:'0px'}}>Add Recipe Detail</li></Typography>
      <Grid container spacing={1} sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'15px'}}>
      <Grid item xs={2}>
      <ThemeProvider theme={theme}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',backgroundColor:'#fff',width:'83px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            paddingTop:'3px'}}>Event Types</InputLabel>
        <Select
          labelId="dropdown1-label"
          id="dropdown0"
          name="0"
          multiple
          required
          value={dropdownValues[0] || []}
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
    {dropdownValues[0]?.map((item,index)=>
    ( 
      <Grid item xs={2}>
      <FormControl fullWidth margin="normal">
        <InputLabel id={`dropdown${index+1}-label`}
        sx={{fontSize:'13px',backgroundColor:'#fff',width:'140px',paddingLeft:'4px',
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        paddingTop:'3px'}}>Recipe for {item}</InputLabel>
          <Select
          id={`dropdown${index+1}`}
          name={`${index+1}`}
          multiple
          required
          value={dropdownValues[index+1] || []}
          onChange={handleDropdownChange}
          renderValue={(selected) => selected.join(', ')}
          >
          {item == "PersonalProgram" ? ( 
            arrayofrecipedetail.PersonalProgram.map((item)=>( 
          <MenuItem value={`${item}`}>
            <Checkbox checked={dropdownValues[index+1]?.includes(`${item}`)} />
            <ListItemText primary={`${item}`} />
          </MenuItem> )))
           : item == "FamilyFunction" ? (
            arrayofrecipedetail.FamilyFunction.map((item)=>( 
              <MenuItem value={`${item}`}>
            <Checkbox checked={dropdownValues[index+2]?.includes(`${item}`)} />
            <ListItemText primary={`${item}`} />
          </MenuItem> ))): 
          item == "ProfessionalEvent" && (
            arrayofrecipedetail.ProfessionalEvent.map((item)=>( 
              <MenuItem value={`${item}`}>
            <Checkbox checked={dropdownValues[index+3]?.includes(`${item}`)} />
            <ListItemText primary={`${item}`} />
          </MenuItem> ))
          )
           }
        </Select>
      </FormControl>
      </Grid>))}
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
      </LowerSectionWrapper>
      )
}