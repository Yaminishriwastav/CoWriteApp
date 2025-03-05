import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Text, Heading, Button, Textarea, VStack } from "@chakra-ui/react";

const StoryView = ({ user }) => {
  const { id } = useParams(); // Get story ID from URL
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    if (!user) {
      alert("Please log in to view and contribute to stories.");
      navigate("/login");
      return;
    }

    // Fetch story from mock server
    axios.get(`http://localhost:5000/stories/${id}`)
      .then(({ data }) => setStory(data))
      .catch(() => setStory(null)); // Handle 404 errors gracefully
  }, [id, user, navigate]);

  if (!story) {
    return <Heading textAlign="center" color="red.500">Story not found or loading...</Heading>;
  }

  const handleContribute = async () => {
    if (!sentence.trim()) {
      alert("Please enter a valid sentence.");
      return;
    }
    
    if (sentence.split(" ").length > 20) {
      alert("Each contribution must be 20 words or less.");
      return;
    }

    // Check if story is already completed
    if (story.sentences.length >= 10) {
      alert("This story has reached the maximum number of contributions.");
      return;
    }

    // Update story with the new sentence
    const updatedStory = {
      ...story,
      sentences: [...story.sentences, { text: sentence, author: user.email }]
    };

    try {
      await axios.put(`http://localhost:5000/stories/${story.id}`, updatedStory);
      setStory(updatedStory);
      setSentence("");
      alert("Contribution added!");
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  return (
    <Box p={10} maxW="600px" mx="auto">
      <Heading mb={4}>{story.title}</Heading>

      <VStack align="start" spacing={3}>
        {story.sentences.map((s, index) => (
          <Text key={index}><b>{s.author}:</b> {s.text}</Text>
        ))}
      </VStack>

      {story.sentences.length < 10 && (
        <>
          <Textarea
            placeholder="Add your sentence (max 20 words)"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            mt={4}
          />
          <Button onClick={handleContribute} colorScheme="blue" mt={2}>
            Contribute
          </Button>
        </>
      )}
    </Box>
  );
};

export default StoryView;
