import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GridItemsExplorePage() {
  return (
    <Container maxWidth="xl" sx={{paddingBottom:'10px',height:'100%'}}>
    <Grid container={true} spacing={{ xs: 2, md: 3, lg: 3 }} rowGap={1} >
      {Array.from(Array(6)).map((_, index) => (
        <Grid item xs={12} sm={4} md={3} lg={3} key={index}>
          <Box gridColumn="span 4" sx={{width:'inherit',
          boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.2)'}}>
          <Item sx={{width:'inherit'}}>xs=8</Item>
        </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
  );
}