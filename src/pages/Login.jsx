import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button,Heading,Input,Box} from "@chakra-ui/react";
import { Field } from "@/components/ui/field"

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("http://localhost:5000/users");

    const validUser = data.find((user) => user.email === email && user.password === password);
    if (validUser) {
      setUser(validUser);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box as="form" onSubmit={handleLogin}>
      <Heading>Login</Heading>
     
      <Field label="Email" >
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Field>
        <Field label="Password" required>
          
        <Input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Field>
        <Button type="submit" color="black" bg="blue.subtle" width="full" mt={4}>
          Login
        </Button>
      
    </Box>
  );
};

export default Login;
