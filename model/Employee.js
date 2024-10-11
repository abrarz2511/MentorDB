const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employeeSchema = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Employee', employeeSchema);    //mongoose makes this model name all lowercase and plural by default, it will look for the employees collection in the db