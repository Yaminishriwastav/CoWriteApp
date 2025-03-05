import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/stories").then(({ data }) => setStories(data));
  }, []);

  return (
    <div>
      <h2>Ongoing Stories</h2>
      {stories.map((story) => (
        <Link key={story.id} to={`/story/${story.id}`}>
          <h3>{story.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default StoryList;
