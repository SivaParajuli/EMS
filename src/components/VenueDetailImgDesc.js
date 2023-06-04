import styled from '@emotion/styled';
import { Button, Container, Grid, TextField, createTheme } from '@mui/material';
import React,{useState} from 'react'
import  {  ThemeProvider } from '@mui/material';
import {  VisibilityOutlined } from '@mui/icons-material';
import { Form } from 'react-router-dom';


const FileInputLabel = styled.label`
  display: block;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight:500;
`;

const theme = createTheme({
    components:{
        MuiInputBase:{
            styleOverrides:{
                input:{
                        fontSize:'14px',
                        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                        fontWeight:'400',
                        letterSpacing:'0.3px'
                }
            }
        },
    MuiFormLabel:{
        styleOverrides:{
            root:{
                    fontSize:'13px',
                    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                    fontWeight:'500',
                    letterSpacing:'0.3px'
            }
        }
    },
    MuiContainer:{
        styleOverrides:{
            root:{
                display:'flex',flexDirection:'column',gap:'20px',marginTop:'20px'
            }
        }
    },
    MuiGrid:{
        styleOverrides:{
            root:{
                display:'flex',flexDirection:'row',gap:'10px',alignItems:'center'
            }
        }
    },
    MuiButton:{
        styleOverrides:{
            root:{
                "&:hover":{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'#001'},
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  
              fontWeight:'500',height:'100%',marginTop:'15px',   
              backgroundColor: 'rgba(0, 0, 0, 0.05)',boxShadow:'0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.3)',
              color:'#001',borderRadius:'20px'
            }
        }
    }
}
});

function VenueDetailImgDesc() {
    const [selectedFile, setSelectedFiles] = useState([]);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
    setValue(event.target.value);
    };

    
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
      };
      console.log(selectedFile)
      const handleOverlayClick = () => {
        if (selectedFile.length > 0) {
            selectedFile.forEach((item)=>{
                const fileUrl = URL.createObjectURL(item);
                window.open(fileUrl, '_blank');
            }
            )
        }
      };

  return (
    <ThemeProvider theme={theme}>
    <Form onSubmit={()=>console.log("hello")}>
    <Container maxWidth={'xl'} >
        <Grid item xs={12} >
            <FileInputLabel>
              Upload venue verification file(PDF or Image):
            </FileInputLabel>
            <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                multiple
                required
              />
        <VisibilityOutlined onClick={handleOverlayClick} sx={{cursor:'pointer'}}/>
        </Grid>
        <TextField type="textarea" value={value} required onChange={handleChange} 
        label="Write Description" multiline 
        fullWidth rows={8}/>
        <Grid xs={2}>
        <Button type="submit">Submit</Button>
        </Grid>
        </Container>
        </Form>
        </ThemeProvider>
  )
}

export default VenueDetailImgDesc