/**
 * @api {Post} /api/users/register Register-User
 * @apiName Register-User
 * @apiGroup User
 *
 * @apiBody {String} firstName  firstName of the User.
 * @apiBody {String} lastName  lastName of the User.
 *
 * @apiBody {String} email email of the User.
 * @apiBody {String} password password of the User.
 *
 * @apiBody {String} conform_password conform_password of the User.
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /api/user/register
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

const UserModel = require("../Model/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookieparser = require("cookie-parser");

exports.RegisterUser = async (req, res) => {
  const { firstName, lastName, email, password, conform_password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      const Salt = await bcrypt.genSalt();
      const password_hash = await bcrypt.hash(password, Salt);
      const conpassword_hash = await bcrypt.hash(conform_password, Salt);

      const token = jwt.sign(
        {
          email: email,
        },
        process.env.JWT_TOKEN,
        { expiresIn: 60 * 60 }
      );

      const user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password_hash,
        conform_password: conpassword_hash,
        token,
      });

      await user.save();

      res.status(200).json({
        message: "User registered successfully.",
        status: 1,
        data: [user],
      });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * @api {Post} /user/login Login-User
 * @apiName Login-User
 * @apiGroup User
 *

 *
 * @apiBody {String} email email of the User.
 * @apiBody {String} password password of the User.
 *

 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/login
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

// Login user
exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            email: email,
          },
          process.env.JWT_TOKEN,
          { expiresIn: "10m" }
        );

        const refreshToken = jwt.sign(
          {
            email: email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        existingUser.token = refreshToken;
        await existingUser.save();

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: "User logged in successfully.",
          status: 1,
          data: {
            _id: existingUser._id,
            email: email,
            token: accessToken,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};


/**
 * @api {Get} /user/logout Logout-User
 * @apiName Logout-User
 * @apiGroup User
 *

 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/logout
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

// Logout User

exports.LogoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "User logged out successfully.",
      status: 1,
      data: {
        token: "",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logout user" });
  }
};

// GetAllUserData

/**
 * @api {Get} /user/getalluser Getalluser 
 * @apiName Getalluser 
 * @apiGroup User-Details
 *

 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/getalluser
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

exports.GetAllUser = async (req, res) => {
  try {
    const user = await UserModel.find();

    if (user) {
      res.status(200).json({
        message: "All User Data",
        status: 1,
        data: user,
      });
    } else {
      res.status(400).json({ message: "user is not" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logout user" });
  }
};

// NodeMailer

exports.GetMailer = async (req, res) => {
  const { email } = req.body;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SendGrid_Api_key);

  const message = {
    to: email,
    from: {
      name: "PrabaIDY",
      email: "prabakaran.dhanasekar@twilightsoftwares.com",
    },
    subject: "Hello World",
    text: "This is the body of the mail",
    html: '<a href="http://localhost:3000/createPassword"> <i>Hello</i> from <b style="color:blue;">Click Me</b></a>',
  };

  sgMail
    .send(message)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(404).json(error));
};

// Reset Password (http://localhost:3000/createPassword)

/**
 * @api {Post} /user/resetpassword  Reset-Password
 * @apiName resetpassword
 * @apiGroup User
 *
 * @apiBody {String} _id  _id of the User.
 * @apiBody {String}  password password of the User.
 *
 * @apiBody {String} conform_password conform_password of the User.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/resetpassword
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

exports.ResetPassword = async (req, res) => {
  const { _id, password, conform_password } = req.body;

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== conform_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // You should implement your password validation logic here (e.g., password strength requirements)

    user.password = password;
    user.conform_password = conform_password;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Reset is not working" });
  }
};

/**
 * @api {Post} /user/update  Update-user
 * @apiName Update-user
 * @apiGroup User-Details
 *
 * @apiQuery {String} _id  _id of the User.
 * @apiBody {String} firstName  firstName of the User.
 * @apiBody {String} lastName  lastName of the User.
 * @apiBody {String} email  email of the User.
 * @apiBody {String}  password password of the User.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/update
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

// Update User

exports.updateUser = async (req, res) => {
  const { _id } = req.query;
  const { firstName, lastName, email, password } = req.body;

  try {
    console.log("Id", _id);
    const user = await UserModel.findById(_id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;

      await user.save();

      res.status(200).json({
        message: "User updated successfully.",
        status: 1,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      });
    } else {
      res.status(404).json({ message: "Bad Request" });
    }
  } catch (error) {
    console.log("msg", error);
    res.status(500).json({ message: error });
  }
};

/**
 * @api {Post} /user/delete?:id  Delete-user
 * @apiName Delete-user
 * @apiGroup User-Details
 *
 * @apiQuery {String} _id  _id of the User.
 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/delete?:id
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */

// delete user

exports.DeleteUser = async (req, res) => {
  const { _id } = req.query;

  try {
    const user = await UserModel.findByIdAndDelete(_id);

    if (user) {
      console.log("Deleted user:", user);
      res.status(200).json({
        message: "User deleted successfully.",
        status: 1,
        data: {},
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * @api {Post} /user/refresh Refresh-Token
 * @apiName Refresh-Token
 * @apiGroup Refresh-Token
 *
 * @apiQuery {String} _id  _id of the User.
 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "message": "Property List retrieve successfully.",
 *      "status": 1,
 *      "data":{}
 * }
 * @apiSampleRequest /user/refresh
 * @apiErrorExample {json} Page error
 * HTTP/1.1 400 Internal Server Error
 */


// Refresh token Api

exports.RefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  console.log("refreshToken", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { _id } = req.query;
    console.log("_id", _id);

    const user = await UserModel.findOne({_id:_id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      {
        _id: _id,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "10m" }
    );

    res.status(200).json({
      message: "Access token refreshed successfully.",
      status: 1,
      data: {
        token: accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};




