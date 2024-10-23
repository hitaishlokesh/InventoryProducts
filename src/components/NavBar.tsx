import React from 'react';
import { Box, Button } from '@chakra-ui/react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  return (
    <Box mb={5} display="flex" justifyContent="space-between">
      <Button
        colorScheme={isAdmin ? 'red' : 'gray'}
        onClick={() => setIsAdmin(true)}
      >
        Admin
      </Button>
      <Button
        colorScheme={!isAdmin ? 'red' : 'gray'}
        onClick={() => setIsAdmin(false)}
      >
        User
      </Button>
    </Box>
  );
};

export default Navbar;
