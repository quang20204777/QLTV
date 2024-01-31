const express = require('express')
const app = express();
const { sequelize } = require('./models/index')
const { rootRouter } = require('./routers/index')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')
var cors = require('cors')
const path = require('path')


//CORS 
app.use(cors())

//cài static file
app.use(express.static('public')); 
app.use('/avatarBook', express.static('avatarBook'));


//swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(express.json())

app.use("/api/v1", rootRouter)

app.listen(3000, async () => {
    console.log(`listening http://localhost:3000`)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

