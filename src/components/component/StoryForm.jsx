import { useState } from "react";
import axios from "axios";

const StoryForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sentence.split(" ").length > 20) {
      alert("Each contribution must be 20 words or less.");
      return;
    }

    const newStory = { title, sentences: [{ text: sentence, author: user.email }] };
    await axios.post("http://localhost:5000/stories", newStory);
    alert("Story created!");
  };

  return (
    <div>
      <h2>Create a Story</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="First Sentence" value={sentence} onChange={(e) => setSentence(e.target.value)} required />
        <button type="submit">Create Story</button>
      </form>
    </div>
  );
};

export default StoryForm;
