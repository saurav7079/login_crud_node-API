const mongoose = require("mongoose")
mongoose.connect(process.env.DB)
    .then((res)=>console.log("successfully conntected to Database"))
    .catch((err)=>console.log("failed to connect"))

    module.exports = mongoose