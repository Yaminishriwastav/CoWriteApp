import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";

const AuthForm = ({ isLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // **Login Logic**
      const { data } = await axios.get("http://localhost:5000/users");
      const validUser = data.find((user) => user.email === email && user.password === password);

      if (validUser) {
        setUser(validUser);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    } else {
      // **Registration Logic**
      const newUser = { email, password };

      await axios.post("http://localhost:5000/users", newUser);
      alert("Registration successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading textAlign="center" mb="4">{isLogin ? "Login" : "Register"}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" colorScheme="blue" width="full">
            {isLogin ? "Login" : "Register"}
          </Button>
        </VStack>
      </form>
      <Text mt="4" textAlign="center">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <Button variant="link" colorScheme="blue" onClick={() => navigate(isLogin ? "/register" : "/login")}>
          {isLogin ? "Register" : "Login"}
        </Button>
      </Text>
    </Box>
  );
};

export default AuthForm;
