import React, { useState, useReducer, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Paper,
  MenuList,
  MenuItem,
} from '@mui/material';
import { Event } from '@mui/icons-material';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavbarStyle = styled(AppBar)`
  background-color: #364652;
`;

const NavbarContainer = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Added flex-wrap property */

  @media (max-width: 600px) {
  flex-direction: column;
  align-items: flex-start;
}
`;

const Logo = styled(Event)`
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
  color: #ffffff;
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

const Navbar = () => {
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

  return (
    <NavbarStyle position="fixed">
      <NavbarContainer>
        <Logo variant="h4" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledNavLink to="/" activeClassName="active">
            <NavLink
              color="inherit"
              onClick={() => handleSetActive('forHome')}
              sx={{
                borderBottom: isActive.forHome ? '2px solid #2A9D8F' : '0px',
              }}
            >
              Home
            </NavLink>
          </StyledNavLink>
          <StyledNavLink to="/explorepage" activeClassName="active">
            <NavLink
              color="inherit"
              onClick={() => handleSetActive('forExplore')}
              sx={{
                borderBottom: isActive.forExplore ? '2px solid #2A9D8F' : '0px',
              }}
            >
              Explore
            </NavLink>
          </StyledNavLink>
          <StyledNavLink to="/loginpage" activeClassName="active">
            <NavLink
              color="inherit"
              onClick={() => handleSetActive('forLogin')}
              sx={{
                borderBottom: isActive.forLogin ? '2px solid #2A9D8F' : '0px',
              }}
            >
              Login
            </NavLink>
          </StyledNavLink>
          <DropdownContainer onMouseLeave={handleDropdownClose}>
            <NavLink
              color="inherit"
              onMouseEnter={handleDropdownOpen}
              onClick={() => handleSetActive('forRegister')}
              sx={{
                borderBottom: isActive.forRegister ? '2px solid #2A9D8F' : '0px',
              }}
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
      </NavbarContainer>
    </NavbarStyle>
  );
};

export default Navbar;
