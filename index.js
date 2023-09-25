const express = require("express");
<<<<<<< HEAD
const flightList = require("./flight");
=======
const flightList = require("./flight")
const hotelList = require("./hotelList")
>>>>>>> 7c3218dc31f36f012a23a90b7ac6347b3149bdd3

const app = express();
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
            startIndex = 0
        };
        if (!limit) {
            limit = 10
        }

        delete req.query.page;
        delete req.query.limit;
        const resDate = flightList.slice(startIndex, startIndex + parseInt(limit))?.map(flight => {
            return {
                ...req.query,
                ...flight,
            }
        });

        console.log(startIndex, startIndex + parseInt(limit))

        res.status(200).json({
            data: resDate,
            count: flightList.length
        })
    } catch (error) {
        console.log(error.message);
        res.status(422).json({
            message: error.message
        })
    }
})

app.get("/hotel", async (req, res) => {
    try {
        let { page, limit } = req.query;
        let startIndex = (parseInt(page) - 1) * parseInt(limit);
        if (!startIndex) {
            startIndex = 0
        };
        if (!limit) {
            limit = 10
        }

        delete req.query.page;
        delete req.query.limit;
        const resDate = hotelList.slice(startIndex, startIndex + parseInt(limit))?.map(hotel => {
            return {
                ...hotel,
                ...req.query,
            }
        });

        console.log(startIndex, startIndex + parseInt(limit))

        res.status(200).json({
            data: resDate,
            count: hotelList.length
        })
    } catch (error) {
        console.log(error.message);
        res.status(422).json({
            message: error.message
        })
    }
})

app.get("/", (req, res) =>{
    res.send("booking....")
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
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
