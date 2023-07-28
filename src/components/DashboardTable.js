import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AdminData, ClientTableData } from "./TableData";

const theme = createTheme({
    components:{
        MuiTableCell:{
            styleOverrides:{
                root:{
            fontSize:'13px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            }
            }
        }
    }
});


const TableContent = (props)=> {

  const handleAcceptance = async(id)=> {
    try{
      let request = await fetch(`http://localhost:8888/admin-/update/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
      },body: JSON.stringify({status:0})
      })
      let response = await request.json()
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  const handleRejection = async(id)=> {
    try{
      let request = await fetch(`http://localhost:8888/admin-/update/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
      },body: JSON.stringify({status:1})
      })
      let response = await request.json()
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  return(
    <ThemeProvider theme={theme}>   
    <Typography variant="h6" fontSize="large" gutterBottom>
          Latest Requests
    </Typography> 
    <TableContainer component={Paper} className="table" sx={{boxShadow:'none'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Request ID</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">VenueName</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Contact</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.filePath} alt="image" className="image" style={{height:'20px',width:'30px'}}/>
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.userName}</TableCell>
              <TableCell className="tableCell">{row.venueName}</TableCell>
              <TableCell className="tableCell">{row.city_name}</TableCell>
              <TableCell className="tableCell">{row.mobile_no}</TableCell>
              <TableCell className="tableCell" sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
              <span onClick={()=>handleAcceptance(row.id)} style={{cursor:'pointer',padding:'7px 5px',backgroundColor:'slategrey'}}>Accept</span>                
              <span onClick={()=>handleRejection(row.id)} style={{cursor:'pointer',padding:'7px 5px',backgroundColor:'slategrey'}}>Reject</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  )
}

const DashboardTable = (props) => {

  switch(props.type){
      case "VENUE":
      return (<TableContent data={ClientTableData} />)
      break;
      case "ADMIN":
      return <TableContent data={AdminData()}/>
      break;
      default:
      break;
  }
  return 
};

export default DashboardTable;
