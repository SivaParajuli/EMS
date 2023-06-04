import React, { useContext, useEffect } from 'react';
import { lazy } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/AuthContext';
import { Container, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
const DashboardChart = lazy(()=> import('./DashboardChart'));
const DashboardFeatured = lazy(()=> import('./DashboardFeatured'));
const DashboardWidget = lazy(()=> import('./DashboardWidget'));
const DashboardTable = lazy(()=> import('./DashboardTable'));

const scrollbarStyle = {
  '&::-webkit-scrollbar':{
    width: '0px'
  },
  '&::-webkit-scrollbar-track':{
    background: '#e0e0e0'
  },
  '&::-webkit-scrollbar-thumb':{
    background: '#888',
    borderRadius: '4px'
  }
}

const ContainerWrapper = styled(Container)(({siderbarT})=>({
  ...scrollbarStyle,
    width:siderbarT ? `calc(100vw - 240px)`: `calc(100vw - 64px)`,
    marginLeft: siderbarT ? '240px' : '64px',
    padding:'5px 30px 5px 20px',
  }));
 
const theme = createTheme({
    components:{
    MuiTypography:{
        styleOverrides:{
          root:{
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

          }
        }
      },MuiContainer:{
        styleOverrides:{
          root:{
            backgroundColor:'#FCFDFD'
          }
        }
      }
    }
});

const DashboardPreview = () => {
    const[state,setState] = useContext(AuthContext);
    const siderbarT = state.siderbarToggle;
    
    
    const handleScroll = ()=>{
        if(window.scrollY >= 64 ){
            setState({...state,pageScroll:true})
        }else{
            setState({...state,pageScroll:false})
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll)
        return ()=> {
        window.removeEventListener("scroll",handleScroll)
        }
    },[])

    return (
        <ThemeProvider theme={theme}>    
        <ContainerWrapper siderbarT={siderbarT} 
        disableGutters maxWidth={'xl'} sx={{marginTop:'30px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <DashboardWidget type="user" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <DashboardWidget type="order" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <DashboardWidget type="earning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <DashboardWidget type="balance" />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={4}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <DashboardFeatured />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <DashboardChart />
        </Grid>
      </Grid>
      <Box marginTop={4} sx={{webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            padding:'10px 10px',
            borderRadius: '10px'}}>
        <Typography variant="h6" fontSize="large" gutterBottom>
          Latest Transactions
        </Typography>
        <DashboardTable />
      </Box>
      </ContainerWrapper>
      </ThemeProvider>
  );
};

export default DashboardPreview;
