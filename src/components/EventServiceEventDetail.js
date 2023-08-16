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
  "Necessary Digital Systems",
  "Vibrant and Audible Hall"
  ]

} 

export const arrayofrecipedetail = {
  "RecipeList":[
      "Biryani Steamed",
      "Candle Night Special",
      "Thakali Set","Soup Items","Sweet Items",
      "Mashed Potato Chilly",
      "Cake",
      "Beans Pickle Chilly",
      "Potato Ball","Samosa Chat",
      "Paneer Chilly","Fried Veg Curry",
      "Barbq and SoftDrinks With Liquors",
      "Momo and Pizza",
      "Fish Curry Chilly",
      "Drumstick and Prawn",
      "Dinner Set",
      "Fruit Salad"
  ]
}

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
  
  const UpperSectionWrapper = styled('div')({
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    marginTop:'15px'
  }) 


  const GuestRange = ["100-200","200-300","300-400","400-500","500-600","600-700","700-800","800-900","900-1000"]

function EventServiceEventDetail() {
    const [textValues, setTextValues] = useState({});
    const [dropdownValues, setDropdownValues] = useState({});
    const [capacity,setRequiredCapacity] = useState("")

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
      
      const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log({capacity,...textValues,...dropdownValues})
        try{
        const url = `http://localhost:8888/venue-/update/${JSON.parse(sessionStorage.getItem("email"))}`;
        const request = await fetch(url,{
        method: "PUT", 
        headers: {
        Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token")),
        "Content-Type": "application/json"
        },
        body: JSON.stringify({capacity,...textValues,...dropdownValues})
        });
      const response = await request.json();
      console.log(response)
        }catch(error){
          console.log(error)
        }
      console.log(dropdownValues)
      }

      
      
  return (
    <UpperSectionWrapper>
      <Form onSubmit={handleSubmit}>
      <Typography variant='body2' sx={{  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      fontWeight:'600'}}>
      <li sx={{padding:'0px'}}>Add Event Detail</li></Typography>
      <ThemeProvider theme={theme}>
     <Grid container spacing={1} sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'15px'}}>

     <Grid item xs={12} lg={2}>
          <RoleDropdown
              select
              label="GuestRange"
              name="capacity"
              value={capacity}
              onChange={(e)=>{
              setRequiredCapacity((prevValue)=> prevValue = e.target.value)
              }}
              variant="outlined"
              required
              > 
              { GuestRange.map((value)=>(
                        <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{value}</MenuItem>
                    ))
              }
              </RoleDropdown>
        </Grid>
    <Grid item xs={2}>
    <TextField
    type="text"
      label="Available Rooms"
      name="availableRooms"
      value={textValues.availableRooms || ""}
      onChange={handleTextChange}
      fullWidth
      required
      margin="normal"
    />
    </Grid>
    <Grid item xs={2}>
    <FormControl fullWidth margin="normal">
      <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',backgroundColor:'#fff',width:'83px',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        paddingTop:'3px'}}>Event Types</InputLabel>
      <Select
        labelId="dropdown0-label"
        id="dropdown0"
        name="functionTypes"
        multiple
        required
        value={dropdownValues.functionTypes || []}
        onChange={handleDropdownChange}
        renderValue={(selected) => selected.join(', ')}>
        {["PersonalProgram","FamilyFunction","ProfessionalEvent"].map((item,index)=>(
        <MenuItem value={item} key={index}>
          <Checkbox checked={dropdownValues[0]?.includes({item})} />
          <ListItemText primary={item} />
        </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Grid>
    <Grid item xs={2}>
    <FormControl fullWidth margin="normal">
      <InputLabel id={`dropdown1-label`}
      sx={{fontSize:'13px',backgroundColor:'#fff',width:'140px',paddingLeft:'4px',
      fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

        paddingTop:'3px'}}>For Programs</InputLabel>
        <Select
        id={`dropdown1`}
        name={`availableServices`}
        multiple
        required
        value={dropdownValues.availableServices || []}
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
    <Grid item xs={2}>
      <FormControl fullWidth margin="normal">
        <InputLabel id={`dropdown-label`}
        sx={{fontSize:'13px',backgroundColor:'#fff',width:'140px',paddingLeft:'4px',
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        paddingTop:'3px'}}>RecipeList</InputLabel>
          <Select
          id={`dropdown`}
          name={`recipe`}
          multiple
          required
          value={dropdownValues.recipe || []}
          onChange={handleDropdownChange}
          renderValue={(selected) => selected.join(',')}
          >
          {arrayofrecipedetail.RecipeList.map((item)=>( 
          <MenuItem value={`${item}`}>
            <Checkbox checked={dropdownValues[2]?.includes(`${item}`)} />
            <ListItemText primary={`${item}`} />
          </MenuItem> ))}
        </Select>
      </FormControl>
      </Grid>
    <Button type="submit"
                  sx={{":hover":{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001'},
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                  fontWeight:'550',height:'100%',marginTop:'15px', boxShadow:'0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.3)',   
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001',borderRadius:'20px'}}
                  >
                    Submit
                  </Button>
    </Grid>
    </ThemeProvider>
    </Form>
    </UpperSectionWrapper>
  )
}

export default EventServiceEventDetail