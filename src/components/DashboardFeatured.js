import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#80CACC",
    },
    secondary: {
      main: "#f44336",
    },
    textSecondary: {
      main: "#757575",
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
            fontSize:'20px',
            borderRadius:'10px'
          }
        }
      }
  }
});

const DashboardFeatured = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            padding:'15px 15px 20px 15px',
            borderRadius: '10px'}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
          <Typography variant="h3" fontSize="large" fontWeight="500">
            Total Revenue
          </Typography>
          <MoreVertIcon fontSize="small" />
        </Box>
        <Box textAlign="center">
          <Box width="100px" margin="0 auto">
            <CircularProgress variant="determinate" value={70} />
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize:'16px'}} gutterBottom>
            Total sales made today
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            $420
          </Typography>
          <Typography variant="body2" color="textSecondary.main" fontSize="small">
            Previous transactions processing. Last payments may not be included.
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} 
            sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
              <Typography variant="subtitle2" fontWeight="bold">
                Today
              </Typography>
              <Box display="flex" alignItems="center" marginTop={1}>
                <KeyboardArrowDownIcon fontSize="small" color="secondary" />
                <Typography variant="body2" className="resultAmount">
                  $1.4k
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
            sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
              <Typography variant="subtitle2" fontWeight="bold">
                Last Week
              </Typography>
              <Box display="flex" alignItems="center" marginTop={1}>
                <KeyboardArrowUpIcon fontSize="small" color="primary.main" />
                <Typography variant="body2" className="resultAmount">
                  $12.4k
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
            sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
              <Typography variant="subtitle2" fontWeight="bold">
                Last Month
              </Typography>
              <Box display="flex" alignItems="center" marginTop={1}>
                <KeyboardArrowUpIcon fontSize="small" color="primary.main" />
                <Typography variant="body2" className="resultAmount">
                  $6.4k
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardFeatured;
