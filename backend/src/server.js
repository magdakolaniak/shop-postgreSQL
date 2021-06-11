import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import db from './db/index.js';
import productRoute from './services/products/index.js';
import reviewRoute from './services/reviews/index.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/products', productRoute);
server.use('/reviews', reviewRoute);

const port = process.env.PORT || 3001;
console.table(listEndpoints(server));

db.sequelize
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () =>
      console.log('✅ Server is running on port', port)
    );
    server.on('error', (error) =>
      console.log('❌ Server is not running', error)
    );
  })
  .catch((error) => {
    console.log(error);
  });
