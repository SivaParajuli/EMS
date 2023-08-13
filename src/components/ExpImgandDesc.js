import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {  Button, Container, Typography, createTheme } from '@mui/material';
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
    const {email} = useParams()  
    const [value, setValue] = React.useState(1);
    const[state] = React.useContext(AuthContext);
    const[programList,setProgramList] = React.useState([])
    const[recipemenuList,setRecipeMenuList] = React.useState([])
   

    console.log(value)

    React.useEffect(()=>{
      async function getVenueById(){
        if(state.logstate !== null){
        try{
        const request = await fetch(`http://localhost:8888/client-/venueDetails/${email}`,{
          method:"GET",
          headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
        });
        const response = await request.json()
        setVenueDetail((prevValue) => prevValue = response?.data)
        setValue((prevValue)=> prevValue = response.data?.ratings)
        let recipelist = response.data?.functionTypes
        setProgramList((prevValue) => prevValue = recipelist)
        setRecipeMenuList((prevValue)=> prevValue = response.data?.recipeMenuLists)
        console.log(response)
      }catch(error){
        console.log(error)
      }
      }else{
        try{
          const request = await fetch(`http://localhost:8888/home-/venue/${email}`,{
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

     
      // React.useEffect(()=>{
      //   let value = true
      //   async function getVenueRatings(){

      //       try{
      //         const request = await fetch(`http://localhost:8888/client-/getrating/${email}`,
      //         {
      //         method:"GET",
      //         headers:{
      //         Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
      //         }
      //         })
      //         const response = await request.json()
      //         console.log(response)
      //         }catch(error){
      //         console.log(error)
      //       }
      //   }
      //   getVenueRatings()
      //   return ()=> {
      //     value = false
      //   }
      // },[])

      const handleRate = async (e)=> {
      e.preventDefault()
      try{
        const request = await fetch(`http://localhost:8888/client-/rateVenue/${email}/${JSON.parse(sessionStorage.getItem("email"))}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
        },body: JSON.stringify({rating:value})
        })
        const response = await request.json()
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }

    return(
      <React.Fragment>
     <Container sx={{width:"fit-content",display:"flex",flexDirection:"column",gap:"10px"}}>
      <Typography sx={{fontSize:"30px",fontWeight:"800"}}>{venueDetail.venueName}</Typography>
      <Typography sx={{fontSize:"25px",fontWeight:"700"}}>{venueDetail.userName}</Typography>
      <Typography sx={{fontSize:"21px",fontWeight:"700"}}>{venueDetail.city_name}</Typography>
      <Container disableGutters sx={{display:'flex',flexDirection:'row',alignItems:"flex-start"}}>
        <Container  disableGutters sx={{display:'flex',flexDirection:'column'}}>
        <Typography sx={{fontSize:"18px",fontWeight:"700",
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      }}>Available Events</Typography>
        <ul style={{paddingLeft:"18px"}}>
        {programList?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        <Typography sx={{fontSize:"18px",fontWeight:"700",
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      }}>Available RecipeList</Typography>
        <ul style={{paddingLeft:"18px"}}>
        {recipemenuList?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        </Container>
         <Container disableGutters sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <Typography sx={{fontSize:"18px",fontWeight:"700",
      fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    }}>Available Services</Typography>
      <ul style={{paddingLeft:"18px"}}>
        {venueDetail?.services?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        </Container>
        </Container>
      {/* {state.logstate == "CLIENT" && (
        <form onSubmit={handleRate}>
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
      <Button type="Submit" sx={{backgroundColor:"#fb3a00f"}}>Rate</Button>
      </Box>
      </form>
      )} */}
      {state.logstate == "CLIENT" && (
        <form onSubmit={handleRate}>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-uncontrolled"
        value={value}
      />
      </Box>
      </form>
      )}
     </Container> 
      </React.Fragment>
    )
}

export const DescriptionPanel = ()=> {

  const [state,setState] = React.useContext(AuthContext);
  const siderbarT = state.siderbarToggle;

  const handleScroll = ()=>{
    if(window.scrollY >= 30 ){
        setState((prevState)=>{return {...prevState,pageScroll:true}})
    }else{
      setState((prevState)=>{return {...prevState,pageScroll:false}})
    }
}

React.useEffect(()=>{
  let value = true
    if(value){
    window.addEventListener("scroll",handleScroll)
    }
    return ()=> {
    window.removeEventListener("scroll",handleScroll)
    value = false
    }
},[])

    return(
        <ThemeProvider theme={theme} siderbarT={siderbarT}>
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
