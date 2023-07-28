import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {  Container, Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { AuthContext } from '../context/AuthContext';


const theme = createTheme({
    components:{
        MuiContainer:{
            styleOverrides:{
                root:{
                    display:"flex",
                    flexDirection:"row",
                    gap:"10px"
                }
            }
        },
        MuiTypography:{
          styleOverrides:{
            root:{
              fontSize: '13px' ,  
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            }
          }
        }
    }
})

function StandardImageList() {


  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const DetailDescription = (props)=> {

    const [venueDetail,setVenueDetail] = React.useState([])
    const {id} = useParams()  
    const [value, setValue] = React.useState(1);
    const[state] = React.useContext(AuthContext);

    React.useEffect(()=>{

      async function getVenueById(){
        if(state.logstate !== null){
        try{
        const request = await fetch(`http://localhost:8888/client-/venue/${id}`,{
          method:"GET",
          headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
        });
        const response = await request.json()
        setVenueDetail((prevValue) => prevValue = response.data)
        console.log(response)
      }catch(error){
        console.log(error)
      }
      }else{
        try{
          const request = await fetch(`http://localhost:8888/home-/venue/${id}`,{
            method:"GET"
          });
          const response = await request.json()
          setVenueDetail((prevValue) => prevValue = response.data)
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      }
      getVenueById()

    },[])

    return(
      <React.Fragment>
     <Container sx={{width:"fit-content",display:"flex",flexDirection:"column",gap:"0px"}}>
      <Typography sx={{fontSize:"30px",fontWeight:"800"}}>{venueDetail.venueName}</Typography>
      <Typography sx={{fontSize:"25px",fontWeight:"700"}}>{venueDetail.userName}</Typography>
      <Typography sx={{fontSize:"18px",fontWeight:"600"}}>{venueDetail.city_name}</Typography>
      {state.logstate !== null && (
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </Box>)}
     </Container> 
      </React.Fragment>
    )
}

export const DescriptionPanel = ()=> {

    return(
        <ThemeProvider theme={theme}>
        <Container>
        <StandardImageList/>
        <DetailDescription/>
        </Container>
        </ThemeProvider>
    )

}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
