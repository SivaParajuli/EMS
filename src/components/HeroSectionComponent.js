import heroimageone from '../images/eventseriesone.jpg'
import heroimagetwo from '../images/eventseriestwo.jpg'
import heroimagethree from '../images/eventseriesthree.jpg'
import React from 'react';
import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';


const HeroSection = styled('div')`
  position: relative;
  max-width: 100%;
  margin: 0px auto;
  overflow: hidden;
  background-color:#f5f5f5;
`;

const CarouselImage = styled('img')`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  
`;

const CarouselText = styled('div')`
  
`;

const HeroText = styled(Typography)`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HeroSubtext = styled(Typography)`
  color: #ffffff;
  font-size: 14px;
  font-weight:600;
`;

const LeftWrapper = styled('div')({
      flex:'0.6'
});

const RightWrapper = styled('div')({
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      flex:'0.4',
      padding:'20px'
});


const HeroSectionComponent = () => {
  const carouselItems = [
    {
      image: heroimageone,
      text: 'Book your event online',
      subtext: 'Planning an event? Look no further! Our online booking system makes it quick and convenient to book your next event. Whether it is a conference,concert, wedding, or birthday party simply browse our available options, select your preferred date and time, and secure your booking with ease. Say goodbye to lengthy phone calls and paperwork – book your event online today and enjoy a hassle-free planning experience'
    },
    {
      image: heroimagetwo,
      text: 'Easy and hassle-free Booking',
      subtext: 'Experience hassle-free booking like never before! Our user-friendly online platform allows you to effortlessly book your desired events with just a few clicks. Say goodbye to long queues, endless phone calls, and complicated paperwork. With our streamlined booking process, you can browse through a wide range of events, select your preferred date and time, and secure your reservation instantly.' 
    }
    ,{
      image: heroimagethree,
      text: 'Get Venue of your best fit',
      subtext: `Finding the perfect venue for your event can be a challenging task. Whether it's a wedding, corporate conference, or a social gathering, the venue sets the stage for a memorable experience.Our comprehensive platform offers a wide range of venues, from luxurious ballrooms to rustic outdoor settings, ensuring that you can discover the ideal location for your event.
       Start your search today and embark on a journey to create an unforgettable event!` 
    }
  ];

  return (
    <HeroSection sx={{marginTop:'64px'}}>
      <Carousel animation="slide">
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
    </HeroSection>
  );
};

const CarouselItem = ({ item }) => {
  return (
    <Grid container sx={{display:'flex',flexDirection:'row'}}>
      <Grid xs={12} lg={7}>
      <CarouselImage src={item.image} alt="" loading='lazy' />
      </Grid>
      <Grid xs={12} lg={5} sx={{display:'flex',flexDirection:'row',alignItems:'center',padding:'20px'}}>
      <CarouselText sx={{backgroundColor:'#f1f1f1',padding:'20px',borderRadius:'15px',backdropFilter:'blur(10px)'}}>
        <HeroText variant="h6" sx={{fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        color:'#023047'}}>
          {item.text}</HeroText>
        <HeroSubtext variant="body2" align='center' sx={{fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
        color:'#023047'}} >{item.subtext}</HeroSubtext>
      </CarouselText>
      </Grid>
    </Grid>
  );
};

export default HeroSectionComponent;
