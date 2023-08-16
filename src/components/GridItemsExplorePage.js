import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { NavLink as RouterNavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledNavLink = styled(RouterNavLink)`
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export default function GridItemsExplorePage({extraprops}) {
  const [state] = useContext(AuthContext);
  const[verifiedvenue,setVerifiedVenue] = useState([])


  useEffect(()=>{
    let value = true
    async function getData(){
    if(value){
    try{
      const request = await fetch(`http://localhost:8888/client-/recommend/${JSON.parse(sessionStorage.getItem('email'))}`
      ,{
        method:"GET",
        headers:{
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
      })
      const response = await request.json()
      console.log(response)
    }catch(error){
      console.log(error)
    }
    }
  }
  getData()
  return ()=> {
    value = false
  }
  },[])

  useEffect(()=>{
    let value = true
    let request;
    async function getVerifiedVenue(){
      if(value){
        if(state.logstate == "CLIENT"){
        request = await fetch(`http://localhost:8888/client-/clientHome`,{
        method:"GET",
        headers:{
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
        })
        }else{
        request = await fetch(`http://localhost:8888/home-`,{
        method:"GET"
        })
        }
      let response = await request.json()
      console.log(response)
      setVerifiedVenue((prevValue) => prevValue = response)
      }
    }
    getVerifiedVenue()
    return ()=> {
      value = false
    }
  },[])
  
  return (
    <Container maxWidth="xl" sx={{paddingBottom:'10px',height:'100%'}}>
    <Grid container={true} spacing={{ xs: 2, md: 3, lg: 3 }} rowGap={1} >
      {verifiedvenue.map((item, index) => (
        <Grid item xs={12} sm={4} md={3} lg={3} key={index}>
          <StyledNavLink to={state.logstate == null ? `/explorepage/list/${item?.email}` : `/dashboard/list/detail/${item?.email}`}>
          <Box gridColumn="span 4" sx={{width:'inherit',
          boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.2)'}}>
          <img src={item.filePath} style={{maxWidth:"100%",maxHeight:"100%",width:"100%",height:"100%",objectFit:"cover"}}/>
          <Typography sx={{paddingLeft:"15px",color:"#354F52",
          backgroundColor:"white",fontWeight:"600",
          fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"}}>
            {item.venueName}</Typography>
          <Item sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:"10px",paddingLeft:"14px",paddingTop:"5px",paddingBottom:"5px"}}>
          {extraprops.buttonav}
          </Item>
        </Box>
        </StyledNavLink>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
}