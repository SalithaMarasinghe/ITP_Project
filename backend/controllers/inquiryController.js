import asyncHandler from 'express-async-handler';
import Inquiry from "../models/inquiryModel.js";

//Get all inquiries
export const getInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Inquiry.find({});
    res.json(inquiries);
  });

//Get a single inquiry
export const getInquiry = asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);
  
    if (inquiry) {
      res.json(inquiry);
    } else {
      res.status(404);
      throw new Error('No such Inquiry');
    }
});

//Create a new Inquiry
export const createInquiry = asyncHandler(async (req, res) => {
    const { name, phone, email, subject, message } = req.body;
  
    const newInquiry = new Inquiry({
        name, 
        phone, 
        email, 
        subject, 
        message
    });
  
    const createInquiry = await newInquiry.save();
    res.status(201).json(createInquiry);

    console.log(newInquiry);

});

  //Delete an inquiry
  export const deleteInquiry = asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);
  
    if (inquiry) {
      await inquiry.remove();
      res.json({ message: 'Deleted' });
    } else {
      res.status(404);
      throw new Error('No such Inquiry');
    }
  });

  //Update an Inquiry
  export const updateInquiry = asyncHandler(async (req, res) => {
    const { name, phone, email, subject, message } = req.body;
  
    const inquiry = await Inquiry.findById(req.params.id);
  
    if (inquiry) {
      inquiry.name = name;
      inquiry.phone = phone;
      inquiry.email = email;
      inquiry.subject = subject;
      inquiry.message = message;
  
      const updateInquiry = await inquiry.save();
      res.json(updateInquiry);
    } else {
      res.status(404);
      throw new Error('No such Inquiry');
    }
  });

  export default {
    getInquiries,
    getInquiry,
    createInquiry,
    deleteInquiry,
    updateInquiry
  };