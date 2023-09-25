const express = require("express");
const cors = require("cors");
const flightList = require("./flight");
const hotelList = require("./hotelList");

const app = express();
app.use(cors());
// app.use(express.static('public'));
app.use((req, res, next) => {
  req.rootDir = __dirname;
  next();
});

const port = 8000;

app.get("/flights", async (req, res) => {
  try {
    let { page, limit } = req.query;
    let startIndex = (parseInt(page) - 1) * parseInt(limit);
    if (!startIndex) {
      startIndex = 0;
    }
    if (!limit) {
      limit = 10;
    }

    delete req.query.page;
    delete req.query.limit;
    const resDate = flightList
      .slice(startIndex, startIndex + parseInt(limit))
      ?.map((flight) => {
        return {
          ...req.query,
          ...flight,
        };
      });

    console.log(startIndex, startIndex + parseInt(limit));

    res.status(200).json({
      data: resDate,
      count: flightList.length,
    });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      message: error.message,
    });
  }
});

app.get("/hotel", async (req, res) => {
  try {
    let { page, limit } = req.query;
    let startIndex = (parseInt(page) - 1) * parseInt(limit);
    if (!startIndex) {
      startIndex = 0;
    }
    if (!limit) {
      limit = 10;
    }

    delete req.query.page;
    delete req.query.limit;
    const resDate = hotelList
      .slice(startIndex, startIndex + parseInt(limit))
      ?.map((hotel) => {
        return {
          ...hotel,
          ...req.query,
        };
      });

    console.log(startIndex, startIndex + parseInt(limit));

    res.status(200).json({
      data: resDate,
      count: hotelList.length,
    });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("booking....");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
