import * as React from 'react';
import {useState, useReducer} from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  MenuList,
  MenuItem,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Event } from '@mui/icons-material';
import { NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const drawerWidth = '80%';

const theme = createTheme({
  components:{
    MuiBackdrop:{
      styleOverrides:{
        root:{
          background:'none'
        }
      }
    },MuiModal:{
      styleOverrides:{
        backdrop:{
          visibility:'none'
        }
      }
    }
  }
})

const Logo = styled(Event)`
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
  color: #ffffff;
`;
const LogoRes = styled(Event)`
  font-weight: bold;
  font-size: 30px;
  margin-right: 10px;
  color: #000;
`;

const NavLink = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontWeight: 'bold',
  textTransform: 'none',
  height: '64px',
  borderRadius: '0px',
  '&:hover': {
    color: '#E9C46A',
  },
  
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    padding: '8px 16px',
  }
}));

const NavLinkRes = styled(Button)(({ theme }) => ({
  color: '#000',
  width:'400px',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontWeight: 'bold',
  textTransform: 'none',
  height: '64px',
  borderRadius: '0px',
  '&:hover': {
    color: '#E9C46A',
  },
  
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    padding: '8px 16px',
  }
}));

const DropdownContainer = styled(Box)`
    position: relative;
  
    ${({ theme }) => theme.breakpoints.down('sm')} {
    &:hover {
    div {
      display: block;
    }
  }
}
`;

const DropdownMenu = styled(Paper)`
  position: absolute;
  top: 100%;
  left: 0;
`;
const DropdownMenuRes = styled(Paper)`
  position: absolute;
  left: 60%;
  top:0;
`;

const DropdownItem = styled(MenuItem)`
  font-size: 15px;
  font-weight: bold;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledNavLink = styled(RouterNavLink)`
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
const StyledNavLinkRes = styled(RouterNavLink)`
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const initialState = {
  forHome: false,
  forExplore: false,
  forLogin: false,
  forRegister: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        forHome: action.item === 'forHome',
        forExplore: action.item === 'forExplore',
        forLogin: action.item === 'forLogin',
        forRegister: action.item === 'forRegister',
      };
    default:
      return state;
  }
};


function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, dispatch] = useReducer(reducer, initialState);

  const handleSetActive = (item) => {
    dispatch({ type: 'SET_ACTIVE', item });
  };
  
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ 
      display:'flex',flexDirection:'column',gap:'10px',
      alignItems:'center',padding:'20px',backgroundColor:'#f9f9f9',height:'100vh',
      
      }}>
      <LogoRes variant="h4" />
      <Divider />
      <StyledNavLinkRes to="/" activeClassName="active">
           <NavLinkRes
              onClick={() => handleSetActive('forHome')}
            >
              Home
            </NavLinkRes>
          </StyledNavLinkRes>
          <StyledNavLinkRes to="/explorepage" activeClassName="active">
            <NavLinkRes
              color="inherit"
              onClick={() => handleSetActive('forExplore')}
            >
              Explore
            </NavLinkRes>
          </StyledNavLinkRes>
          <StyledNavLinkRes to="/loginpage" activeClassName="active">
            <NavLinkRes
              color="inherit"
              onClick={() => handleSetActive('forLogin')}
              
            >
              Login
            </NavLinkRes>
          </StyledNavLinkRes>
          <DropdownContainer onMouseLeave={handleDropdownClose}>
            <NavLinkRes
              color="inherit"
              onMouseEnter={handleDropdownOpen}
              onClick={() => handleSetActive('forRegister')}
              
            >
              Register
            </NavLinkRes>
            <DropdownMenuRes
              elevation={3}
              sx={{ display: isDropdownOpen ? 'block' : 'none',
              '&::-webkit-scrollbar': {
                width: '0px'
              }}}
              onMouseLeave={handleDropdownClose}
            >
              <MenuList>
                <DropdownItem onClick={handleDropdownClose}>
                  <StyledNavLinkRes
                    to="/registrationpageUO"
                    onClick={() => handleSetActive('forRegister')}
                    activeClassName="active"
                  >
                    User
                  </StyledNavLinkRes>
                </DropdownItem>
                <DropdownItem onClick={handleDropdownClose}>
                  <StyledNavLinkRes
                    to="/registrationpageD"
                    onClick={() => handleSetActive('forRegister')}
                    activeClassName="active"
                  >
                    Dealer
                  </StyledNavLinkRes>
                </DropdownItem>
              </MenuList>
            </DropdownMenuRes>
          </DropdownContainer>
          
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex'}}>
      <AppBar component="nav">
        <Toolbar  sx={{ display: 'flex',flexDirection:'row',
        backgroundColor: '#364652',justifyContent:'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo variant="h4" />
          <Box
          sx={{
            display:{xs:'none',sm:'block',lg:'flex',xl:'flex'},
            alignItems: 'center'
          }}
        >
          <StyledNavLink to="/" activeClassName="active">
           <NavLink
              color="inherit"
              onClick={() => handleSetActive('forHome')}
              
            >
              Home
            </NavLink>
          </StyledNavLink>
          <StyledNavLink to="/explorepage" activeClassName="active">
            <NavLink
              color="inherit"
              onClick={() => handleSetActive('forExplore')}
              
            >
              Explore
            </NavLink>
          </StyledNavLink>
          <StyledNavLink to="/loginpage" activeClassName="active">
            <NavLink
              color="inherit"
              onClick={() => handleSetActive('forLogin')}
              
            >
              Login
            </NavLink>
          </StyledNavLink>
          <DropdownContainer onMouseLeave={handleDropdownClose}>
            <NavLink
              color="inherit"
              onMouseEnter={handleDropdownOpen}
              onClick={() => handleSetActive('forRegister')}
              
            >
              Register
            </NavLink>
            <DropdownMenu
              elevation={3}
              sx={{ display: isDropdownOpen ? 'block' : 'none' }}
              onMouseLeave={handleDropdownClose}
            >
              <MenuList>
                <DropdownItem onClick={handleDropdownClose}>
                  <StyledNavLink
                    to="/registrationpageUO"
                    onClick={() => handleSetActive('forRegister')}
                    activeClassName="active"
                  >
                    User
                  </StyledNavLink>
                </DropdownItem>
                <DropdownItem onClick={handleDropdownClose}>
                  <StyledNavLink
                    to="/registrationpageD"
                    onClick={() => handleSetActive('forRegister')}
                    activeClassName="active"
                  >
                    Dealer
                  </StyledNavLink>
                </DropdownItem>
              </MenuList>
            </DropdownMenu>
          </DropdownContainer>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
 
  window: PropTypes.func,
};

export default Navbar;