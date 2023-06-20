import React, { useContext } from 'react'
import ExploreSectionComponent from './ExploreSectionComponent'
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Container, createTheme } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

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

const ContainerWrapper = styled(Container)(({siderbarT})=>({
    ...scrollbarStyle,
      width:siderbarT ? `calc(100vw - 240px)`: `calc(100vw - 64px)`,
      marginLeft: siderbarT ? '240px' : '64px'
}));

function ExploreVenue() {

    const[state,setState] = useContext(AuthContext);
    const siderbarT = state.siderbarToggle;

    return (
    <ThemeProvider theme={theme}>
    <ContainerWrapper siderbarT={siderbarT}>
        <ExploreSectionComponent/>
    </ContainerWrapper>
    </ThemeProvider>
  )
}

export default ExploreVenue