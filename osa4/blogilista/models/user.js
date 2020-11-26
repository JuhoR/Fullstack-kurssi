const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true, minlength: 3},
    name: String,
    passwordHash: {type: String, required: true},
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)