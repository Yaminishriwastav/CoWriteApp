import { useNavigate} from "react-router-dom";
import { 
  Box, Button, Heading, Text, VStack, List, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [stories, setStories] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/stories")
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.error("Error fetching stories:", error);
      });
  }, []);

  const handleReadStory = (storyId) => {
    const isAuthenticated = localStorage.getItem("user"); 
    if (isAuthenticated) {
      navigate(`/stories/${storyId}`); 
    } else {
      navigate("/login"); 
    }
  };


  return (
    <Box textAlign="center" p={10}>
      <Heading>Welcome to CoWriteApp</Heading>
      <Text fontSize="lg" mt={4}>
        Collaborate with others to create unique stories!
      </Text>

      {/* Show list of story titles */}
      <VStack spacing={4} mt={6} align="center">
        <Heading size="md">Stories</Heading>
        <List.Root spacing={3}>
          {stories.map((story) => (
            <List.Item key={story.id} p={4} borderWidth="1px" borderRadius="md">
              {/* Display Cover Image */}
              <Image 
                src={story.coverImage} 
                alt={story.title} 
                borderRadius="md" 
                mb={3} 
                boxSize="300px"
                objectFit="cover"
              />

              {/* Show Story Title */}
              <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
              <Button 
                color="blue" bg= "black"
                mt={2} 
                onClick={() => handleReadStory(story.id)}
              >
                Read Story
              </Button>
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </Box>
  );
}

export default Home;
