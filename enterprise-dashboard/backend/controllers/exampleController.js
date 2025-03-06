// controllers/exampleController.js

// Example controller functions
const getExample = (req, res) => {
    res.send('This is a GET request');
  };
  
  const postExample = (req, res) => {
    const data = req.body;
    res.json({ message: 'This is a POST request', data });
  };
  
  module.exports = {
    getExample,
    postExample,
  };