const User = require("../Model/user");

exports.saveUser = (async (req, res) => {
  // console.log(req.body);
  const { name, email, phone, dob, address, gender } = req.body;
  const isName = /^[a-zA-Z ]{5,25}$/.test(name);
  const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  const isPhone = /^[6-9]\d{9}$/.test(phone);
  const isDob = typeof dob === 'string';
  const isAddress = /^[a-zA-Z0-9\s,'-:]*$/.test(address);
  const isGender = gender === 'male' || gender === 'female';


  if (!name || !email || !phone) {
    return res.status(403).json({ success: false, msg: "please fill all the fields" });
  }
  console.log(isName, isEmail, isPhone, isDob, isAddress, isGender)
  try {
    if (isName && isEmail && isPhone && isDob && isAddress && isGender) {
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res.status(202).json({ success: false, msg: "Account is already created" });
      }
      const user = new User({ name, email, phone, dob, address, gender });
      const newUser = await user.save();
      if (newUser) {
        return res.status(200).json({ success: true, msg: "User Account is created" });
      }
    }

    return res.status(403).json({ success: false, msg: "please fill all the fields correctly." });


  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err })
  }


})



exports.showUser = (async (req, res) => {
  try {
    const allUser = await User.find();
    if (allUser) {
      return res.status(200).json({ success: true, data: allUser })
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err })
  }
})


exports.editUser = (async (req, res) => {
  // console.log(req.body);
  const { name, email, phone, dob, address, gender } = req.body;
  const isName = /^[a-zA-Z ]{5,25}$/.test(name);
  const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  const isPhone = /^[6-9]\d{9}$/.test(phone);
  const isDob = typeof dob === 'string';
  const isAddress = /^[a-zA-Z0-9\s,'-:]*$/.test(address);
  const isGender = gender === 'male' || gender === 'female';
  try {
    if (isName && isEmail && isPhone && isDob && isAddress && isGender) {
      const { _id, name, email, phone, gender, address } = req.body;
      const updataedUser = await User.findByIdAndUpdate({ _id: _id }, { $set: { name, email, phone, gender, address } });
      if (updataedUser) {
        return res.status(200).json({ success: true, msg: "User updated sucessfully." })
      }
      res.status(402).json({ success: false, msg: "unable to update user." })
    }

    return res.status(403).json({ success: false, msg: "please fill all the fields correctly." });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
})

exports.deleteUser = (async (req, res) => {
  const ids = req.params.id;
  try {

    const deletedUser = await User.findOneAndDelete({ _id: ids });
    if (!deletedUser) {
      return res.status(402).json({ success: false, msg: "unable to delete user", ids });
    }
    res.status(200).json({ success: true, msg: "User deleted sucessfully", ids });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
})