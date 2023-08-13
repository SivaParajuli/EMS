import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, ThemeProvider, createTheme } from '@mui/material'
import React, { Fragment } from 'react'

const theme = createTheme({
    components:{
    MuiSnackbarContent:{
        styleOverrides:{
            message:{
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                fontSize:"13px",
                fontWeight:"400"
            }
        }
    }
    }
})

const SnackbarComponent = (props) => {

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        props.funcopen((prevValue) => prevValue = false);
      };

      console.log(props.setopen)
  return (
    <ThemeProvider theme={theme}>
            <Snackbar
                anchorOrigin={{
                    horizontal: "middle",
                    vertical: "top",
                }}
                open={props.setopen}
                autoHideDuration={3000}
                sx={{marginTop:"50px"}}
                message={props.setvalid ? "Successfull!" : "Unsuccessfull!"}
                onClose={handleToClose}
                action={
                    <Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleToClose}
                        ><CloseIcon fontSize='small'/>
                        </IconButton>
                    </Fragment>
                }
            />
        </ThemeProvider>
  )
}

export default SnackbarComponent