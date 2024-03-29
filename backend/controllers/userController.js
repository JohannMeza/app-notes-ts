const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { tokenAuth } = require("../config/config");
config();

const index = async(req, res) => {
  try {
    const user = await User.findAll();
    return res.status(201).json({ res: user })
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const accessUser = async(req, res) => {
  try {
    const { username, password } = req.body;
    
    const findUser = await User.findOne({
      where: { username },
    });
    if (findUser) {
      const user = findUser;
      const passDecode = user.password === password
      if (!passDecode) throw ({
        error: true,
        message: 'La contraseña es incorrecta',
        status: 401
      })

      return res.status(201).json(findUser)
    }

    throw ({
      error: true,
      message: 'La contraseña es incorrecta',
      status: 401
    })
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const registerUser = async(req, res) => {
  try {
    let passEncode, repeatuser;
    const { username, password } = req.body;
    
    if (!username) throw ({
      error: true,
      message: 'Username field is empty',
      status: 401
    });

    if (!password) throw ({
      error: true,
      message: 'Password field is empty',
      status: 401
    });
    
    repeatuser = await User.findOne({ where: { username }});

    if (repeatuser) throw ({
      error: true,
      message: 'El usuario ya esta registrado',
      status: 401
    });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      passEncode = bcrypt.hashSync(password, salt)
    }

    const newUser = await User.create({ username, password: passEncode });
    const token = jwt.sign({ user: newUser.dataValues }, tokenAuth, {
      expiresIn: 86400 * 7 // 24 horas * 7 dias
    })
    
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const loginUser = async(req, res) => {
  try {
    let findUser;
    const { username, password } = req.body;
    if (!username) throw ({
      error: true,
      message: 'Username field is empty',
      status: 401
    });

    if (!password) throw ({
      error: true,
      message: 'Password field is empty',
      status: 401
    });
    
    findUser = await User.findOne({ where: { username }});

    if (findUser) {
      const user = findUser;
      const passDecode = bcrypt.compareSync(password, user.password)
      
      if (!passDecode) throw ({
        error: true,
        message: 'La contraseña es incorrecta',
        status: 401
      })
      
      const token = jwt.sign({ user }, tokenAuth, {
        expiresIn: 86400 * 7 // 24 horas * 7 dias
      })

      return res.status(201).json({ token })
    }

    throw ({
      error: true,
      message: 'La contraseña es incorrecta',
      status: 401
    })
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

module.exports = {
  index,
  loginUser,
  registerUser,
  accessUser
}