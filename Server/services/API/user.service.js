const thirdwebAuth = require('../../config/thirdwebAuth');
const User = require("../../model/user.model");
const Otp = require("../../model/otp.model")
const {sendEmail}= require("../../helper/email.helper")
const path = require('path');
const pug = require('pug');
const fs = require('fs');

module.exports.getDataUser = async (jwt) => {
    if (!jwt) {
        throw new Error("Unauthorized");
    }
    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    if (!authResult.valid) {
        throw new Error("Unauthorized");
    }
    const user = await User.findOne({ address: authResult.parsedJWT.sub });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
module.exports.updateUser = async (payload) => {
    try {
        const { address, avatar, statusNotify } = payload;
        const user = await User.find({ address });
        if(user){
            const updatedUser = await User.updateOne(
                { address },
                { avatar, statusNotify }
            );
            return {
                success: true,
                message: 'User information updated successfully.',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: 'An error occurred while updating user information.',
            error: error.message,
        };
    }
  }

  module.exports.createOTP = async (email) => {
    try {
      const emailExists = await User.findOne({ email});
      if (emailExists) {
        return {
          success: false,
          message: 'Email already exists',
        };
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6);
      await Otp.deleteMany({ email, isUsed: false });

      const newOtp = new Otp({
        email,
        code,
      });
      await newOtp.save();

      const templatePath = path.join(__dirname, '../../templates/otp.pug');
      const html = pug.renderFile(templatePath, {
        otpCode: code,
        actionLink: process.env.CLIENT_DOMAIN,
      });

      const mailSent = await sendEmail(email, 'Verify email', html);
      if (!mailSent) {
        throw new Error('Failed to send OTP email');
      }

      return {
        success: true,
        message: 'OTP sent successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating OTP.',
        error: error.message, 
      };
    }
  };

module.exports.verifyOtp = async (email, code, address) => {
  try {
    const otp = await Otp.findOne({ email, code, isUsed: false });
    if (!otp) {
      return false;
    }
    otp.isUsed = true;
    await otp.save();
    await User.updateOne(
      { address},       
      { $set: { email } } 
    )
    return true;
  } catch (error) {
    console.error('verifyOtp error:', error);
    return false;
  }
};