const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        },
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})

userSchema.methods.sayHi = function(){
    console.log(`hi, my name is ${this.name}`)
}

userSchema.statics.findByName = function() {
    return this.find({name: new RegExp(name, 'i')})
}

userSchema.query.byName = function() {
    return this.where({name: new RegExp(name, 'i')})
}

//virtual property
userSchema.virtual('namedEmail').get(function(){
    return `${this.name} <${this.email}>`
})

//middleware
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

userSchema.post('save', function(doc, next) {
    doc.sayHi()
    next()
})

module.exports = mongoose.model('User', userSchema)