import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8884d8",
    },
    secondary: {
      main: "#f44336",
    },
  },
  components:{
    MuiTypography:{
        styleOverrides:{
          root:{
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          }
        }
      },MuiSvgIcon:{
        styleOverrides:{
          root:{
            fontSize:'22px',
            borderRadius:'10px',
            padding:'3px'
          }
        }
      }
  }
});

const DashboardWidget = ({ type }) => {
  let data;

  const amount = 100;
  const difference = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlineIcon
            className="icon"
            sx={{
              color: "#E97451",
              backgroundColor: "#F4BAA9",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            sx={{
              color: "#E9C46A",
              backgroundColor: "#F7EAC9"
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            sx={{
              color: "#264653",
              backgroundColor: "#B3D1DC",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: false,
        link: "See details",
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            sx={{
              color: "#F4A261",
              backgroundColor: "#FCE5D2",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="widget">
        <Grid container justifyContent="space-between" alignItems="center"
         sx={{webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            padding:'10px 10px',
            borderRadius: '10px'}}>
          <Grid item >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {data.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {data.isMoney && "$"} {amount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.link}
            </Typography>
          </Grid>
          <Grid item >
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <Typography variant="body2" className="percentage positive" sx={{ mr: 1 }}>
                <KeyboardArrowUpIcon />
                {difference}%
              </Typography>
              {data.icon}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardWidget;
