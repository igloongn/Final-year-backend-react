const mongoose =require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
var cors = require('cors')
const newsRouter = require('./api/routes/news')
const { searchController, Pagination } = require('./api/controller/news')
const userRouter = require('./api/routes/user')
const testRouter = require('./api/routes/test')


const dbURI = 'mongodb://localhost:27017/NewsAPI'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        // console.log(res.models)
        start()
    })
    .catch(err => console.error(err))
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/news', newsRouter)
app.use('/search/:searchQuery', searchController)
app.use('/pagination', Pagination)
app.use('/user', userRouter)



app.use('/test', testRouter)








app.use((req, res, next) => {
    return res.status(404).json({
        msg: 'General Error: Sorry this page Cannot be found'
    })
})

const start = () => {
    app.listen(1234, () => {
        console.log('Listening on port 1234.....')
    })
}

