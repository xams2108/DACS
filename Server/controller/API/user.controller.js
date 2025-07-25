const userService = require("../../services/API/user.service");
const Otp = require("../../model/otp.model")
module.exports.index = async (req, res) => { 
    return res.status(200).json({ message: "User data", user: req.user });

};
module.exports.jwt = async( req, res) => {
    return res.status(200).json({ sucsess: true, jwt: req.session.jwt });
}
module.exports.ChangeInfo = async(req,res) => {
    payload = {
        ...req.body,
        address: req.user.address
    }
    const result = await userService.updateUser(payload);
    return res.status(200).json(result);
    
    
    
}
module.exports.Otp = async (req, res) => {
    const { email } = req.body; 
    try {
        const otpResult = await userService.createOTP(email);
        if (otpResult) {
            return res.status(200).json(otpResult);
        }
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
    }
};

module.exports.VerifyOtp = async (req, res) => {
    const { email, code } = req.body;
    const { address} = req.user;
    try {
        const verificationResult = await userService.verifyOtp(email, code, address);
        if (verificationResult) {
            return res.status(200).json({
                status: "success",
                message: 'OTP verification successful!'
            });
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP code.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
    }
};

