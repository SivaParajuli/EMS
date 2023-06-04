import React,{useState} from 'react';
import { lazy } from 'react';
import dayjs from 'dayjs';
import { Button, Skeleton, TextField} from '@mui/material'
import  styled  from '@emotion/styled';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useJsApiLoader,Autocomplete } from '@react-google-maps/api';
import Stack from '@mui/material/Stack';


const DropdownComponentNames = lazy(()=> import("./DropdownComponent").then(module=>{
  return { default: module.DropdownComponentNames}
}));
const DropdownComponentValues = lazy(()=>import("./DropdownComponent").then(module=>{
  return { default: module.DropdownComponentValues}
}));
const GridItemsExplorePage = lazy(()=> import('./GridItemsExplorePage'));



const nextMonth = dayjs().add(30,'day');
const tomorrow = dayjs().add(1,'day');

const CustomTextField = styled(TextField )({
    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    fontWeight: 'bold',
  
});

const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
  }
`;
const SubmitButton = styled(Button)`
  background-color: #384E77; /* Update the button background color */
  color: #E6F9AF; /* Set the text color to white */
  &:hover {
    background-color: #384E77; /* Update the button background color on hover */
    color:#E6F9AF;
  }
`;
const center = {
  lat: 27.734649721065097, 
  lng: 85.35900791127253, 
};

const EventDetails = {
  "Professional Event":["500","1000","2000","3000","4000","5000","200000","400000","600000","800000","1000000"],
  "Family Function":["400000","600000","800000","1000000","1200000"],
  "Personal Program":["50000","100000","200000","300000","400000"]
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
  } 
  },
});


const ExploreSectionComponent = React.memo(()=> {

  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [pricing,setPricing] = useState("");

	
	const handleSearchTerm = event =>{
    setSearchTerm(event.target.value);
	};
  
  const filterEventValue = ()=>{
    for(let item in EventDetails){
        if(item == role){
            return EventDetails[item]
        }
    }
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);

  };

  const handlePricing = (event)=> {
    setPricing(event.target.value);
  }

  console.log(role);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries:['places']
  });

  if(!isLoaded){
    return (
      <Stack spacing={1} sx={{marginTop:'50px'}}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '20px',marginTop:'50px' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={80} sx={{marginTop:'50px'}} height={80} />
      <Skeleton variant="rectangular" width={1500} sx={{marginTop:'50px'}} height={60} />
      <Skeleton variant="rounded" width={1500} sx={{marginTop:'50px'}} height={60} />
    </Stack>
    )
  }
  
  const handlePlaceSelect = (place) => {
    setSearchTerm(place.formatted_address);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} sx={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          gap:'5px',
          marginTop:'100px',
          marginBottom:'40px',
          position:'relative'}}>
          <Grid xs={2} >
          <DateTimePicker
          label="StartingDate"
            defaultValue={tomorrow}
            disablePast
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </Grid>
        <Grid xs={2}>
          <DateTimePicker
          label="EndingDate"
          disablePast
            defaultValue={nextMonth}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
          </Grid>
          <Grid  xs={2}>
            <Autocomplete
            onLoad={(autocomplete) => {
            autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            handlePlaceSelect(place);
            });
            }}
            >
              <CustomTextField 
              variant="outlined"
              required
              fullWidth
              id="location"
              type="text"
              label="Location"
              InputProps={{
                style: { fontSize: '14px', fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              }
              }}
              InputLabelProps={{
                style: { fontSize: '13px' , fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              },
              }}
              value={searchTerm}
              onChange={handleSearchTerm}
              name="location"
              margin="normal"
            />
            </Autocomplete>
            </Grid>
            {/* <Box position="absolute" left={50} top={100} height="100%" width="100%">
              <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%',height:'100%'}}>
              
              </GoogleMap>
            </Box> */}
          <DropdownComponentNames role={role} eventDetails={EventDetails} 
          setRole={setRole} handleRoleChange={handleRoleChange}/>
          
          <DropdownComponentValues role={role} pricing={pricing} eventValues={filterEventValue()}
          setPricing={setPricing} handlePricing={handlePricing}/>
        
          <SubmitButton type="submit" fullWidth variant="contained" sx={{
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          width:'7%'
          }} color="primary">
          Search
        </SubmitButton>
        </Grid>
        <GridItemsExplorePage/>
        </ThemeProvider>
    </LocalizationProvider>
  );
});

export default ExploreSectionComponent