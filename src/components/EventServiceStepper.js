import React from 'react';
import { lazy } from 'react';
import{ Container } from '@mui/material';
const EventServiceEventDetail = lazy(()=> import('./EventServiceEventDetail'));



const EventServiceStepper = () => {
  
  return (
      <Container maxWidth={'xl'} sx={{display:'flex',flexDirection:'column',gap:'20px',marginTop:'10px'}}>
      <EventServiceEventDetail/>
      <hr/>
      </Container>
    
  );
};

export default EventServiceStepper;
