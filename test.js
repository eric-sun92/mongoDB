const { default: mongoose } = require('mongoose')
const mognoose = require('mongoose')
const User = require('./user.js')

mongoose.connect("mongodb://localhost/testdb", () => {
    console.log('connected to db')
}, err => console.log(err))

// const user = new User({name: "Kyle", age: 26})

// user.save().then(() => {
//     console.log("user saved")
// })

async function run() {
    const user1 = await User.create({
        name: "Eric", 
        age: 20, 
        address: { street: "123 St", city: "Boston"},
        email: "TEST@test.com"
    })
    console.log(user1)
    // const user2 = new User({name: "Kyle", age: 26, hobbies: ["lifting, coding"]})
    // await user2.save()
    // console.log('user 2 saved')
    // console.log(user2)
    // user2.name = "Harry"
    // await user2.save()
    // console.log(user2)
}

run()


async function runError(){
    try {
        const errUser = await User.create({name: "Alex", age: "asdf"})
        await errUser.save()
        console.log("done")
    } catch(err) {
        console.log(err)
    }
}

// runError()

async function run2(){
    try {
        const user = await User.where("age").gt("12")
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}
run2()