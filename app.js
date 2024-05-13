// Imports
const express = require("express");
const deviceAPIRoutes = require("./routes/devices");

// Definitions
const app = express();
const port = 3000;

// Server setup
app.use(express.json());
app.use("/devices", deviceAPIRoutes);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
