const express = require('express');

const server = express();

const actionRoutes = require('./routes/actionRoutes');
const projectRoutes = require('./routes/projectRoutes');

server.use(express.json());
server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);
server.get('/', (req, res) => {
  res.send('API is running!');
})

server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'))