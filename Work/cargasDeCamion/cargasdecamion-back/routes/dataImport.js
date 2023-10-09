const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Change to your desired port

// Middleware to parse JSON requests
app.use(bodyParser.json());

const uri = "mongodb+srv://karontianpch:JVvlCZEjGBDVW5Sc@cluster0.2zjvwuj.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


  const sampleSchema = new mongoose.Schema({
    Age: Number,
    Date: Date,
    Equipment: String,
    OriginDH: Number,
    Origin: String,
    DestinationDH: Number,
    Destination: String,
    Company: String,
    Contact: String,
    Length: String,
    Weight: Number,
    Rate: String,
  });
  

  const Sample = mongoose.model('Sample', sampleSchema);

  app.get('/test', (req, res) => {
    console.log(req);
    res.status(200).json({ message: 'Connection to MongoDB is successful!' });
  });
  

  app.post('/upload', async (req, res) => {
    try {
      const newSample = new Sample({
        Age: req.body.Age,
        Date: req.body.Date,
        Equipment: req.body.Equipment,
        OriginDH: req.body.OriginDH,
        Origin: req.body.Origin,
        DestinationDH: req.body.DestinationDH,
        Destination: req.body.Destination,
        Company: req.body.Company,
        Contact: req.body.Contact,
        Length: req.body.Length,
        Weight: req.body.Weight,
        Rate: req.body.Rate,
      });
  
      // Save the new sample data to MongoDB
      const savedSample = await newSample.save();
  
      res.status(201).json(savedSample); // Respond with the uploaded data
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
