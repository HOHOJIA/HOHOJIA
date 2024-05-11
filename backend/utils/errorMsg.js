module.exports = {
  inputEmpty: (res) => {
    res.status(400).json({
      error: "Client error - Input feild (images?) should not be empty",
    });
  },
  query: (res) => {
    res.status(500).json({ error: "Server error - query failed" });
  },
  serverError: (res) => {
    res.status(500).json({ error: "server error" });
  },
  noToken: (res) => {
    res.status(401).json({ error: "Client error - No token provided" });
  },
  unauthorized: (res) => {
    res.status(401).json({ error: "unauthorized" });
  },
  wrongToken: (res) => {
    res.status(403).json({ error: "Client error - Invalid token" });
  },
  emailExist: (res) => {
    res.status(403).json({ error: "Email already exists" });
  },
  emailFormat: (res) => {
    res.status(403).json({ error: "Email format is wrong" });
  },
  noUser: (res) => {
    res.status(403).json({ error: "Client error - User Not Found" });
  },
  wrongPassword: (res) => {
    res.status(403).json({ error: "Sign In Failed - wrong password" });
  },
  notFound: (res) => {
    res.status(404).json({ error: "No recipes found" });
  },
  badRequest: (res, detailMsg = "") => {
    res.status(400).json({ error: "Bad request", detail: detailMsg });
  },
  likeExist: (res) => {
    res.status(403).json({ error: "Like already exists" });
  },
};
