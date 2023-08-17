// index.js
const express = require('express');

const ConcesionarioRoutes = require('./routes/ConcesionarioRoutes');
const VehiculoRoutes = require('./routes/VehiculoRoutes');

const app = express();
app.use(express.json());

app.use('/api', ConcesionarioRoutes);
app.use('/api', VehiculoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});