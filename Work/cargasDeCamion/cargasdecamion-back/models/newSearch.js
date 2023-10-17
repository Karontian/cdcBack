const mongoose = require('mongoose');

// // Create a JavaScript Date object
// const today = new Date();

// // Get the year, month, and day components
// const year = today.getFullYear();
// const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
// const day = String(today.getDate()).padStart(2, '0');

// // Format the date to "yyyy-MM-dd" format
// const formattedDate = `${year}-${month}-${day}`;



const newSearchSchema = new mongoose.Schema({
    equipment: String,
    dateRange: String,
    origin: String,
    originDH: Number,
    destination: String,
    destinationDH: Number,
    age: Number,
    createdAt: Number
});

const NewSearch = mongoose.model('newSearch', newSearchSchema);
module.exports = NewSearch;