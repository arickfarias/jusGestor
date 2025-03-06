const axios = require('axios');

const url = 'http://localhost:5000/example'; // Replace with your API endpoint
const data = {
  name: 'John',
  age: 30,
};

axios.post(url, data)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });