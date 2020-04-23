const app = require("./whois");
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Govtechies API running on http://localhost:${PORT}`);
});
