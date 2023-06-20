import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AuthContext} from '../context/AuthContext.js'
import { Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpdateIcon from '@mui/icons-material/Update';
import { Explore } from '@mui/icons-material';

const drawerWidth = 240;

const Dashboardsidebartheme = createTheme({
  components:{
    MuiPaper:{
      styleOverrides:{
        root:{
          backgroundColor:'#fafafa',
          borderRight: '0.5px solid rgb(230, 227, 227)'
        }
      }
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          width: 18, height: 18,color: "#2B709E"
        }
      }
    }
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const sidebarItemDetail = [
  {text:"Home",route:"/dashboard/preview",icon:<DashboardIcon/>},
  {text:"Update Details",route:"/dashboard/addVenueDetails",icon:<UpdateIcon/>}
  ]
   

export default function DashboardSidebar() {
  
  let data;
  const [open, setOpen] = React.useState(false);
  const [state,setState] = React.useContext(AuthContext);
  const authrole = JSON.parse(sessionStorage.getItem("isoftype"))


  switch(authrole){
    case "ADMIN":
    data = [
        {text:"Home",route:"/dashboard/preview",icon:<DashboardIcon/>},
        {text:"Update Details",route:"/dashboard/addVenueDetails",icon:<UpdateIcon/>}
      ]
      break;
      case "CLIENT":
      data = [
        {text:"Preview",route:"/dashboard/preview",icon:<DashboardIcon/>},
        {text:"Update",route:"/dashboard/addVenueDetails",icon:<UpdateIcon/>},
        {text:"Explore",route:"/dashboard/list",icon:<Explore/>}
      ]
      break;
      case "DEALER":
      data = [
        {text:"Home",route:"/dashboard/preview",icon:<DashboardIcon/>},
        {text:"Something",route:"/dashboard/addVenueDetails",icon:<UpdateIcon/>}
      ]
      break;
      default:
      break;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setState({...state,siderbarToggle:!state.siderbarToggle});
  };

  return (
    <ThemeProvider theme={Dashboardsidebartheme}>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer variant="permanent"  open={state.siderbarToggle} >
        <DrawerHeader>
        </DrawerHeader>
        <Divider />
        <List >
          {data.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <Link to={`${item.route}`} style={{textDecoration:'none',color:'GrayText'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: state.siderbarToggle ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    
                    minWidth: 0,
                    mr: state.siderbarToggle ? 2.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                
                <ListItemText 
                disableTypography
                primary={<Typography variant='body2' style={{fontSize:'14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                fontWeight:'500',
                color:'#264653'
                ,opacity: state.siderbarToggle ? 1 : 0}}>{item.text}</Typography>}/>
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
        {data.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <Link to={`${item.route}`} style={{textDecoration:'none',color:'GrayText'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: state.siderbarToggle ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    
                    minWidth: 0,
                    mr: state.siderbarToggle ? 2.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                
                <ListItemText 
                disableTypography
                primary={<Typography variant='body2' style={{fontSize:'14px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                fontWeight:'500',
                color:'#264653'
                ,opacity: state.siderbarToggle ? 1 : 0}}>{item.text}</Typography>}/>
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}






































