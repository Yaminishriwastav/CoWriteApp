import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Heading, Link, Spacer, Container } from "@chakra-ui/react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box 
      as="header" 
      bg="blue.600" 
      color="white" 
      py={4} 
      boxShadow="md" 
      position="fixed" 
      top="0" 
      left="0" 
      width="100%" 
      zIndex="1000"
    >
      <Container maxW="container.lg">
        <Flex align="center">
          <Heading size="lg" color="White">
            
              CoWrite
            
          </Heading>
          <Spacer />

          {user ? (
            <>
              <Button as={RouterLink} to="/" variant="ghost" color="white" _hover={{ bg: "blue.700" }}>
                Home
              </Button>
              <Button as={RouterLink} to="/dashboard" variant="ghost" color="white" _hover={{ bg: "blue.700" }}>
                Dashboard
              </Button>
              <Button onClick={handleLogout} colorScheme="red" ml={4}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="outline" borderColor="white" color="white" mr={2} _hover={{ bg: "blue.700" }}>
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorPalette="Black">
                Register
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
