import app from "./app.js";

const PORT = process.env.PORT || 5080;

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});