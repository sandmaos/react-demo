const app = require('./app');
const http = require('http');
const myDB = require('./database');
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Sync Sequelize model with DB (create tables if not exists)
myDB.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});