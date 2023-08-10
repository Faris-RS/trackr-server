import userModel from "../models/userModel.js";
import otpGenerator from "../utils/otpGenerator.js";
// import sendMail from "../utils/nodemailer.js";

export let otpVerify;

export const sendOtpHelper = (mail) => {
  return new Promise(async (resolve, reject) => {
    const response = {
      otpSent: null,
    };
    // const userExist = await userModel.findOne({ email: user.email });
    // if (userExist) {
    //   response.status = false;
    // } else {

      // await otpGenerator().then((otp) => {
      //   sendMail(user.email, otp).then((result) => {
      //     if (result.otpSent) {
      //       response.otpSent = true;
      //       response.status = true;
      //       otpVerify = otp;
      //       console.log("otp: ", otpVerify);
      //     } else {
      //       response.otpSent = false;
      //     }
      //   });
      // });

      await otpGenerator().then((otp) => {
        response.otpSent = true;
        otpVerify = otp;
        console.log("otp: ", otpVerify);
      });
    // }
    resolve(response);
  });
};

