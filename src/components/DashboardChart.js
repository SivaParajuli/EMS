import React, { useContext, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A9D8F",
    },
    grey: {
      main: "#264653",
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
      }
    }
});

const DashboardChart = () => {

  const[verifiedvenue,setVerifiedVenue] = useState([])
  
  const [state] = useContext(AuthContext);
  const data = verifiedvenue?.map((item)=>{return {name:`${item.userName}`,Total:item.ratings}})

  console.log(data)

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
      const data = response.data
      setVerifiedVenue((prevValue)=> prevValue = data)
      }
    }
    getVerifiedVenue()
    return ()=> {
      value = false
    }
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            padding:'10px 10px',
            borderRadius: '10px'}}>
        <Typography variant="h6" align="center" fontSize="large" gutterBottom>
          Latest Rate Chart
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            fontSize="12px"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke={theme.palette.grey.main} />
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey.main} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardChart;
