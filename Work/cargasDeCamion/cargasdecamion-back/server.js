// Import necessary modules
const express = require('express');
const mongoose = require('mongoose'); // Add Mongoose
const Import = require('./models/import');
const NewSearch = require('./models/newSearch');
const cors = require('cors');


// Create an Express.js app
const app = express();
const port = 3002;

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cors());


// Define your MongoDB connection URI
const uri = "mongodb+srv://karontianpch:JVvlCZEjGBDVW5Sc@cluster0.2zjvwuj.mongodb.net/cargasDC?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// Define a default route
  app.get('/', (req, res) => {
    // You can send a response or render a view here
  });

// Define a test route
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connection to MongoDB is successful!' });
});

//get all loads
app.get('/loads', async (req, res) => {
  try {
    const { equipment } = req.query;

    // Build a query object to filter by equipment if it's provided
    const query = equipment ? { equipment } : {};

    // Fetch data from the 'Import' collection in your MongoDB, applying the filter
    const searchResults = await Import.find(query);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get loads based on equipment

 
//new Search management
app.get('/newSearch', async (req, res) => {
    try {
      // Fetch data from the 'Import' collection in your MongoDB
      const newSearchResults = await NewSearch.find();
      res.status(200).json(newSearchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/newSearch', async (req, res) => {
  try {
     // Assuming req.body contains the new search data
    const newSearchData = req.body;
        
    // Set the createdAt field to the current date and time
    // Create a new NewSearch document based on the request data
    const newSearch = new NewSearch(newSearchData);

    // Save the newSearch document to the database
    const savedNewSearch = await newSearch.save();
    res.status(201).json(savedNewSearch); // Respond with the created data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Edit a search
app.put('/newSearch/:id', async (req, res) => {
    try {

      const searchId = req.params.id;

      const updatedSearchData = req.body; // Updated search data from the client

      // Assuming you have a NewSearch model defined
      const existingSearchEntry = await NewSearch.findByIdAndUpdate(searchId, updatedSearchData, {
          new: true, // Return the updated document
      });

      if (!existingSearchEntry) {
          // Handle the case where the entry does not exist
          return res.status(404).json({ message: 'Search entry not found' });
      }

      // Respond with the updated search entry
      res.status(200).json(existingSearchEntry);
  } catch (error) {
      // Handle errors (e.g., network issues, validation errors)
      console.error('Error updating search entry:', error);
      res.status(500).json({ message: 'Internal server error' });
  }

});

//Id Pull for nonID newSearch edting
app.get('/getNewSearchId/:createdAt', async (req, res) => {
  try {
    // Fetch data from the 'Import' collection in your MongoDB
    const newSearchResults = await NewSearch.find({createdAt: req.params.createdAt});
    res.status(200).json(newSearchResults);
  } catch (error) {
    console.error(error);
  }
  
});


//Delete a search
app.delete('/newSearch/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSearch = await NewSearch.findOneAndDelete({ _id: id });
        if (!deletedSearch) {
          return res.status(404).json({ message: 'Search entry not found' });
        }
    res.status(200).json({ message: 'Search entry deleted successfully' });
  } catch (error) {
    // Handle errors (e.g., item not found, database error)
    console.error('Error deleting search entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

//ADMIN ROUTES//

// Add a new route to ADMIN ADD data TO the database
app.post('/import', async (req, res) => {
  
  try {
    const importData = req.body; // Assuming req.body is an array of import objects

    // Loop through the array and create Import documents for each object
    const imports = [];

    for (const data of importData) {
      const newImport = new Import({
        age: data.age,
        date: new Date(data.date), // Convert date string to Date object
        equipment: data.equipment,
        originDH: data.originDH,
        origin: data.origin,
        destinationDH: data.destinationDH,
        destination: data.destination,
        company: data.company,
        contact: data.contact,
        length: data.length,
        weight: data.weight,
        rate: data.rate,
      });

      imports.push(newImport);
    }

    // Save all the Import documents to MongoDB
    const savedImports = await Import.insertMany(imports);

    res.status(201).json(savedImports); // Respond with the created data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 //ADMIN bulk delete of searches
app.delete('/newSearchDelete', async (req, res) => {

  try {
    // Delete all the documents in the 'Import' collection
    const deleteResult = await NewSearch.deleteMany();

    res.status(200).json(deleteResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deleteBulk', async (req, res) => {
  
    try {
      // Delete all the documents in the 'Import' collection
      const deleteResult = await Import.deleteMany();
  
      res.status(200).json(deleteResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



// Start the Express.js server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });