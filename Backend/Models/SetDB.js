const mongo = require('mongoose')
const mongoURL = process.env.MONGO_CON

mongo.connect(mongoURL).then(()=>{
    console.log('DB connected')
}).catch((err)=>{
    console.log(err)
}
)

module.exports = mongo