import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { META_PASSWORD } = process.env;

export const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "lapin_a@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async emailData => {
  try {
    await transport.sendMail(emailData);
    console.log("Email send success");
  } catch (error) {
    console.log(error.message);
  }
};
