const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Function to process the request data
const processData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';

  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.match(/^[a-zA-Z]$/)) {
      alphabets.push(item.toLowerCase());
      highestLowercase = Math.max(highestLowercase, item.toLowerCase());
    }
  }

  return {
    numbers,
    alphabets,
    highestLowercase: [highestLowercase],
  };
};

// POST endpoint for processing data
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid data format' });
  }

  try {
    const userId = 'john_doe_17091999'; // Replace with actual user generation logic
    const email = 'john@xyz.com'; // Replace with actual email logic
    const rollNumber = 'ABCD123'; // Replace with actual roll number logic
    const processedData = processData(data);

    res.json({
      is_success: true,
      user_id: userId,
      email,
      roll_number: rollNumber,
      ...processedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

// GET endpoint with hardcoded response
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});