const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./routes/report');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/reports', reportRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
