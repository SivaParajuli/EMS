import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { DescriptionPanel } from './ExpImgandDesc';
import PaymentForm from './PaymentDetail';


const scrollbarStyle = {
  '&::-webkit-scrollbar':{
    width: '0px'
  },
  '&::-webkit-scrollbar-track':{
    background: '#e0e0e0'
  },
  '&::-webkit-scrollbar-thumb':{
    background: '#888',
    borderRadius: '4px'
  }
}

const ContainerWrapper = styled(Container)(({siderbarT})=>({
  ...scrollbarStyle,
    width:siderbarT ? `calc(100vw - 240px)`: `calc(100vw - 64px)`,
    marginLeft: siderbarT ? '240px' : '64px',
    padding:'5px 30px 5px 20px',
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function ExploreVenueTabPanel() {
  const [value, setValue] = useState(0);
  const[state] = useContext(AuthContext);
  const siderbarT = state.siderbarToggle;

  const handleChange = (event, newValue) => {
    setValue((prevValue)=>prevValue=newValue);
  };

  return (
    <ContainerWrapper siderbarT={siderbarT} 
    disableGutters sx={{marginTop:'30px'}}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          {state.logstate !== null && <Tab label="Payment" {...a11yProps(1)} />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <DescriptionPanel/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PaymentForm/>
      </TabPanel>
    </Box>
    </ContainerWrapper>
  );
}


