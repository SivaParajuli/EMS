import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dataforclient } from "./DataDetails";

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
    case "CLIENT":
      data = [
        ...dataforclient
      ];
      break;
      case "ADMIN":
      data = [
        ...dataforclient
      ];
      break;
      case "VENUE":
      data = [
        ...dataforclient
      ];
      break;
      default:
      break;
  }

  console.log(data);

  return (
    <ThemeProvider theme={theme}>
      {data.map((item,index)=>(
      <Grid item sm={12} lg={3} xl={12}>
      <Box className="widget" key={index}>  
        <Grid container justifyContent="space-between" alignItems="center"
         sx={{webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            padding:'10px 10px',
            borderRadius: '10px'}}>
          <Grid item >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {item.isMoney && "$"} {amount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.link}
            </Typography>
          </Grid>
          <Grid item >
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <Typography variant="body2" className="percentage positive" sx={{ mr: 1 }}>
                <KeyboardArrowUpIcon />
                {difference}%
              </Typography>
              {item.icon}
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Grid>
      ))}
    </ThemeProvider>
  );
};

export default DashboardWidget;
