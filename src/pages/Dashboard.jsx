import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

const Dashboard = ({ user, setUser }) => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    axios.get("http://localhost:5000/stories").then(({ data }) => {
      setStories(data);
    });
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <Box p={10}>
      <Heading>Welcome, {user?.email}</Heading>
      <Button colorScheme="red" onClick={handleLogout} mt={4}>
        Logout
      </Button>

      <VStack align="start" spacing={4} mt={6}>
        <Heading size="md">Ongoing Stories</Heading>
        {stories
          .filter((story) => story.sentences.length < 10)
          .map((story) => (
            <Link key={story.id} to={`/story/${story.id}`}>
              <Text fontSize="lg" color="blue.500">
                {story.title}
              </Text>
            </Link>
          ))}

        <Heading size="md" mt={6}>Completed Stories</Heading>
        {stories
          .filter((story) => story.sentences.length >= 10)
          .map((story) => (
            <Link key={story.id} to={`/story/${story.id}`}>
              <Text fontSize="lg" color="green.500">
                {story.title}
              </Text>
            </Link>
          ))}
      </VStack>
    </Box>
  );
};

export default Dashboard;
