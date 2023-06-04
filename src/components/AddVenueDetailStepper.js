
import React,{ lazy }  from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import styled from '@emotion/styled';
const VenueDetailImgDesc = lazy(()=>import('./VenueDetailImgDesc')); 
const EventServiceStepper = lazy(()=> import('./EventServiceStepper'));
const EventPricingAdd = lazy(()=> import('./EventPricingAdd'));


const steps = ['Image and Description', 'Event Type and Services', 'Pricing'];

const theme = createTheme({
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          backgroundColor: '#384E77', /* Update the button background color */
          color: '#E6F9AF',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:'500', /* Set the text color to white */
          '&:hover':{
          backgroundColor:'#384E77', /* Update the button background color on hover */
          color:'#E6F9AF'
          }
        }
      }
    },
    MuiStepLabel:{
        styleOverrides:{
          label:{
            fontWeight:'500',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            ,fontSize:'14px',
            color:'#000'
          }
        }
    },MuiSvgIcon:{
      styleOverrides:{
        root:{
          fontSize:'18px'
        }
      }
  },MuiStepIcon:{
      styleOverrides:{
        text:{
          fontSize:'14px',
          fontWeight:'500',
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
        }
      }
    }
  }
});

const ContainerWrapper = styled(Container)(({siderbarT})=>({
  width:siderbarT ? `calc(100vw - 240px)`: `calc(100vw - 64px)`,
  marginLeft: siderbarT ? '240px' : '64px'
}));

export default function AddVenueDetailStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const[state] = React.useContext(AuthContext);
  const siderbarT = state.siderbarToggle;

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = (e) => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => (e) => {
    setActiveStep(step);
  };

  return (
    <ContainerWrapper siderbarT={siderbarT} position="static" maxWidth={'lg'} sx={{marginTop:'50px'}}>
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={theme}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton  disableRipple onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </ThemeProvider>
      <div>
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep == 0 ? <VenueDetailImgDesc/>
               : activeStep == 1 ? <EventServiceStepper/>
               :   <EventPricingAdd/>} 
            </Typography>
            <Container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <ThemeProvider theme={theme}>
              <Button
                disabled={activeStep === 0}
                disableRipple
                onClick={handleBack}
                sx={{ mr: 1 , fontWeight:'550',
                borderRadius:'20px',backgroundColor: activeStep === 0 && 'ButtonShadow',
                cursor: activeStep == 0 && 'not-allowed'}}
              >
                Back
              </Button>
              </ThemeProvider>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button disableRipple 
              disabled={activeStep == 2 && true}
              onClick={handleNext} sx={{ mr: 1,
              ":hover":{backgroundColor: 'rgba(0, 0, 0, 0.38)',color:'#f9f7ec'},fontWeight:'550',
                backgroundColor: activeStep == 2 ? 'ButtonShadow' : 'rgba(0, 0, 0, 0.38)',color:'#f9f7ec',
                borderRadius:'20px'}}>
                Next
              </Button>
              </Box>
            </Container>
          </React.Fragment>
      </div>
    </Box>
    </ContainerWrapper>
  );
}