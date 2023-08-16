import styled from '@emotion/styled';
import { Button, Container, Grid, TextField, createTheme } from '@mui/material';
import React,{useEffect, useState} from 'react'
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
    const [multipartFileList, setMultipartFileList] = useState([]);
    const [description, setdescription] = useState("");


    const handleSubmit = async(e)=> {
        e.preventDefault()

        const formdata = new FormData()
        multipartFileList.forEach((item)=> formdata.append("imageList",item))
        
        console.log(formdata.get("images"))
        console.log({multipartFileList,description})
        // console.log(formdata.get("description"))
        // console.log(formdata.get("multipartFileList"))
        try{
            const request = await fetch(
            `http://localhost:8888/venue-/uploadimage/${JSON.parse(sessionStorage.getItem("email"))}`,{
                method:"PUT",
                headers:{
                  Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
              },body: formdata
            });
            const response = await request.json()
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (event) => {
    setdescription(event.target.value);
    };

    
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setMultipartFileList(files);
      };
      console.log(multipartFileList)
      const handleOverlayClick = () => {
        if (multipartFileList.length > 0) {
            multipartFileList.forEach((item)=>{
                const fileUrl = URL.createObjectURL(item);
                window.open(fileUrl, '_blank');
            }
            )
        }
      };

  return (
    <ThemeProvider theme={theme}>
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <Container maxWidth={'xl'} >
        <Grid item xs={12} >
            <FileInputLabel>
              Upload venue verification file(PDF or Image):
            </FileInputLabel>
            <input
                type="file"
                accept=".pdf,.png,.jpg"
                name="imageList"
                onChange={handleFileChange}
                multiple
                required
              />
        <VisibilityOutlined onClick={handleOverlayClick} sx={{cursor:'pointer'}}/>
        </Grid>
        {/* <TextField type="textarea" value={description} required onChange={handleChange} 
        label="Write Description" multiline 
        fullWidth rows={8}/> */}
        <Grid xs={2}>
        <Button type="submit">Submit</Button>
        </Grid>
        </Container>
        </Form>
        </ThemeProvider>
  )
}

export default VenueDetailImgDesc