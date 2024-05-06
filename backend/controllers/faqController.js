import asyncHandler from 'express-async-handler';
import FAQ from "../models/faqModel.js";

//Get all FAQs
export const getFAQs = asyncHandler(async (req, res) => {
    const FAQs = await FAQ.find({});
    res.json(FAQs);
  });

//Get a single FAQ
export const getFAQ = asyncHandler(async (req, res) => {
    const FAQ = await FAQ.findById(req.params.id);
  
    if (FAQ) {
      res.json(FAQ);
    } else {
      res.status(404);
      throw new Error('No such FAQ');
    }
});

//Create a new FAQ
export const createFAQ = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;
  
    const newFAQ = new FAQ({
      question, 
      answer
    });
  
    const createFAQ = await newFAQ.save();
    res.status(201).json(createFAQ);

    console.log(newFAQ);
});

  //Delete a FAQ
  export const deleteFAQ = asyncHandler(async (req, res) => {
    const FAQ = await FAQ.findById(req.params.id);
  
    if (FAQ) {
      await FAQ.remove();
      res.json({ message: 'Deleted' });
    } else {
      res.status(404);
      throw new Error('No such FAQ');
    }
  });

  //Update a FAQ
  export const updateFAQ = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;
  
    const FAQ = await FAQ.findById(req.params.id);
  
    if (FAQ) {
      FAQ.question = question;
      FAQ.answer = answer;
  
      const updateFAQ = await FAQ.save();
      res.json(updateFAQ);
    } else {
      res.status(404);
      throw new Error('No such FAQ');
    }
  });

  export default {
    getFAQs,
    getFAQ,
    createFAQ,
    deleteFAQ,
    updateFAQ
  };