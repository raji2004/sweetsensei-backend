const {User} = require('../models')
const { randNum ,Mailer} = require('../helpers/helper')
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email.toLowerCase(), password })
        res.send({ user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.register = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
       console.log()
        const check = await User.findOne({ email: email.toLowerCase() })
        if (!check) {
            const user = new User({ fullname, email:email.toLowerCase() , password})
            await user.save()
            res.send({ user })
        } else {
            res.status(400).json({ message: "email already exist" })
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.editprofile = async (req, res) => {
    const { _id } = req.body
    try {
        const user = await User.findByIdAndUpdate({ _id }, { ...req.body })
        res.send({ user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.getprofile = async (req, res) => {
    const { _id } = req.body
    try {
        const user = await User.findById(_id)
        res.send({ user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.emailAuth = async (req, res) => {
    const { email } = req.body
    const num = randNum()

    try {
        const user = await User.findOne({ email:email.toLowerCase()})
        if (user) {
            await Mailer(user.fullname, num, email)
            res.status(200).json({code:num,id:user._id})
        } else {
            res.status(400).json({ message: 'emai is incorrect' })
        }



    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.changePassword= async(req,res)=>{
     const{_id,password }= req.body
     try{
         const user = await User.findById({_id},{password})
         res.send('done')
     }catch(err){
         res.status(400).json({message:err.message})
     }
}

