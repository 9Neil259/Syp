const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/events', eventRoutes);

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
