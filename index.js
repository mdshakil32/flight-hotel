const express = require("express");
const flightList = require("./flight");

const app = express();
// app.use(express.static('public'));
app.use((req, res, next) => {
  req.rootDir = __dirname;
  next();
});

const port = 8000;

app.get("/", (req, res) => {
  res.send("booking......");
});

app.get("/flights", async (req, res) => {
  try {
    const {
      dapartureCity,
      arrivalCity,
      tripWay,
      journeyDate,
      returnDate,
      adults,
      childs,
      classType,
      currency,
      page,
      limit,
    } = req.query;
    const startIndex = (parseInt(page) - 1) * parseInt(limit);

    const resDate = flightList
      .slice(startIndex, startIndex + parseInt(limit))
      ?.map((flight) => {
        return {
          dapartureCity,
          arrivalCity,
          tripWay,
          journeyDate,
          returnDate,
          adults,
          childs,
          classType,
          currency,
          ...flight,
        };
      });

    console.log(startIndex, startIndex + parseInt(limit));

    res.status(200).json(resDate);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
