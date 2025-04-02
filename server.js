const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/waste-data", (req, res) => {
  fs.readFile("Data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading Data.json:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const jsonData = JSON.parse(data);

      // Extract only the waste-related data
      const wasteData = {
        beltFillLevel: jsonData.beltFillLevel,
        wasteCountPerHour: jsonData.wasteCountPerHour,
        wasteSorting: jsonData.wasteSorting,
        nextDockingTime: jsonData.nextDockingTime,
      };

      res.json(wasteData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
