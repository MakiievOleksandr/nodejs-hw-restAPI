const {Schema, model} = require('mongoose');

const {handleMongooseError} = require('../utils')

const contactSchema = new Schema({
    
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, {versionKey: false, timestamps: true})

contactSchema.post('save', handleMongooseError)

const Contact = model('contact', contactSchema);

module.exports =   Contact;
