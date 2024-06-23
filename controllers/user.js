const { User } = require('../models')
const { randNum, Mailer } = require('../helpers/helper')
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email.toLowerCase(), password })
        if (user) {
            res.status(200).json({ message: 'user logged in successfully', user })
        } else {
            res.status(400).json({ message: 'email or password is incorrect' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newEmail = email.toLowerCase()
        const check = await User.findOne({ email: newEmail })
        if (!check) {
            const user = new User({ name, email: newEmail, password })
            await user.save()
            res.status(200).json({ user })
        } else {
            res.status(400).json({ message: "email already exist" })
        }

    } catch (err) {
        console.log(err.message)
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


exports.resetPassword = async (req, res) => {
    const { _id, password, newPassword } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Incorrect password' });
        } else {
            user.password = newPassword
        }
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send({ users })
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
        const user = await User.findOne({ email: email.toLowerCase() })
        if (user) {
            await Mailer(user.fullname, num, email)
            res.status(200).json({ code: num, id: user._id })
        } else {
            res.status(400).json({ message: 'emai is incorrect' })
        }



    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.changePassword = async (req, res) => {
    const { _id, password } = req.body
    try {
        const user = await User.findById({ _id }, { password })
        res.send('done')
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}



exports.saveAddress = async (req, res) => {
    const { _id, pinCode, address, town, city, state, defaultAddress } = req.body;


    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.address.push({ pinCode, address, town, city, state });
        user.defaultAdress = defaultAddress; 
       
        await user.save();

        res.status(200).json({ message: 'Address saved successfully', address: user.address });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getAddresses = async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ addresses: user.address });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteAddress = async (req, res) => {
    const { _id, addressIndex } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (addressIndex < 0 || addressIndex >= user.address.length) {
            return res.status(400).json({ message: 'Invalid address index' });
        }

        user.address.splice(addressIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Address deleted successfully', address: user.address });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.updateAddress = async (req, res) => {
    const { _id, addressIndex, newAddress } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (addressIndex < 0 || addressIndex >= user.address.length) {
            return res.status(400).json({ message: 'Invalid address index' });
        }

        user.address[addressIndex] = newAddress;
        await user.save();

        res.status(200).json({ message: 'Address updated successfully', address: user.address });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
