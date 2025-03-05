const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// User Authentication (Login)
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// User Registration
server.post("/auth/register", (req, res) => {
  const { email, password, username } = req.body;
  const users = router.db.get("users").value();
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: Date.now(), email, password, username };
  router.db.get("users").push(newUser).write();

  res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Story Routes
server.post("/stories", (req, res) => {
  const { title, sentence, author } = req.body;
  if (!title || !sentence || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newStory = {
    id: Date.now(),
    title,
    sentences: [{ text: sentence, author }],
    completed: false,
  };

  router.db.get("stories").push(newStory).write();
  res.status(201).json(newStory);
});

server.patch("/stories/:id", (req, res) => {
  const { id } = req.params;
  const { sentence, author } = req.body;

  const story = router.db.get("stories").find({ id: Number(id) }).value();
  if (!story) return res.status(404).json({ message: "Story not found" });

  if (story.sentences.length >= 10) {
    story.completed = true;
    return res.status(400).json({ message: "Story is complete" });
  }

  if (sentence.split(" ").length > 20) {
    return res.status(400).json({ message: "Sentence exceeds word limit" });
  }

  story.sentences.push({ text: sentence, author });
  router.db.get("stories").find({ id: Number(id) }).assign(story).write();

  res.status(200).json(story);
});

server.use(router);
server.listen(5000, () => console.log("Mock server running on http://localhost:5000"));
