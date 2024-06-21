const {local} = require('./db/database');
const Tours = require('./model/tours');
const app = require('./app');

const port = 3000;

local();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});