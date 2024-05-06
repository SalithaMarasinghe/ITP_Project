import asyncHandler from 'express-async-handler';
import Inquiry from "../models/inquiryModel.js";

function categorizer(subject){
  const keywords = subject.split(" ");

  const categories = ['Product Information', 'Ordering & Shipping', 'Returns & exchanges', 'Promotions & Discounts', 'Complaints', 'Technical issues', 'Other'];

  let score = [0, 0, 0, 0, 0, 0, 5];

  for(let i = 0; i < keywords.length; i++){
      //product_information
      if(keywords[i] == 'sizing' || keywords[i] == 'Sizing' || keywords[i] == 'size' || keywords[i] == 'Size'){
          score[0] += 10;
      }
      if(keywords[i] == 'Material composition'|| keywords[i] == 'material composition'|| keywords[i] == 'Material'|| keywords[i] == 'material'|| keywords[i]=='materials'){
          score[0] += 10;
      }
      if(keywords[i] == 'Color options' || keywords[i] == 'color options' || keywords[i]=='colour' || keywords[i]=='Colour'){
          score[0] += 10;
      }
      if(keywords[i] == 'fabric'|| keywords[i] == 'Fabric'){
          score[0] += 10;
      }
      if(keywords[i] == 'Measurements '|| keywords[i] == 'measurements '){
          score[0] += 10;
      }
      if(keywords[i] == 'style details'|| keywords[i] == 'Style details'|| keywords[i]=='style'){
          score[0] += 10;
      }
      if(keywords[i] == 'collar types'|| keywords[i] == 'Collar types' || keywords[i] == 'Collar' || keywords[i] == 'collar'){
          score[0] += 10;
      }


      //Ordering & Shipping
      if(keywords[i] == 'shipping costs' || keywords[i] == 'Shipping Costs' || keywords[i] == 'Cost' || keywords[i] == 'cost'){
          score[1] += 10;
      }
      if(keywords[i] == 'Delivery times'|| keywords[i] == 'delivery times'){
          score[1] += 10;
      }
      if(keywords[i] == 'not received'|| keywords[i] == 'Not Received'){
          score[1] += 10;
      }
      if(keywords[i]=='shipping method' || keywords[i]=='Shipping method'){
          score[1] += 10;
      }
      if(keywords[i]=='shipping address' || keywords[i]=='Shipping address' || keywords[i]=='address' || keywords[i]=='Address'){
          score[1] += 10;
      }
      if(keywords[i] == 'Delay' || keywords[i] == 'delay'){
          score[1] += 10;
      }
      if(keywords[i] == 'Order Confirmation'|| keywords[i] == 'order confirmation' || keywords[i] == 'order'||keywords[i] == 'Order'){
          score[1] += 10;
      }

      //Returns & exchanges
      if(keywords[i] == 'defective products'||keywords[i] == 'Defective Products'){
          score[2] += 10;
      }
      if( keywords[i] =='Exchange'||keywords[i] == 'exchange'){
          score[2] += 10;
      }
      if(keywords[i] == 'Refund'|| keywords[i] == 'refund'){
          score[2] += 10;
      }
      if(keywords[i] == 'returning' || keywords[i] == 'Returning' || keywords[i] == 'Returned'|| keywords[i] == 'returned' || keywords[i] == 'Return' || keywords[i] == 'return'){
          score[2] += 10;
      }

      //Promotions & Discounts
      if(keywords[i] == 'discount code' || keywords[i] == 'Discount Code'|| keywords[i] == 'discount' || keywords[i]=='discount codes' || keywords[i] == 'code' || keywords[i] == 'Code' || keywords[i] == 'codes'){
          score[3] += 10;
      }
      if(keywords[i] == 'loyalty programs'|| keywords[i] == 'Loyalty Programs'|| keywords[i] == 'loyalty'|| keywords[i] == 'Loyalty'){
          score[3] += 10;
      }
      if(keywords[i] == 'offers' || keywords[i] == 'Offers'){
          score[3] += 10;
      }
      if(keywords[i] == 'rewards'|| keywords[i] == 'Rewards'){
          score[3] += 10;
      }

      //Complaints
      if(keywords[i] == 'does not match'|| keywords[i] == 'Does not match'){
          score[4] += 10;
      }
      if(keywords[i] == 'issues' || keywords[i] == 'Issues' || keywords[i] == 'Issue' || keywords[i] == 'issue'){
          score[4] += 10;
      }
      if(keywords[i] == 'delay' || keywords[i] == 'Delay'){
          score[4] += 10;
      }
      if(keywords[i] == 'Missing' || keywords[i] == 'missing'){
          score[4] += 10;
      }
      if(keywords[i] == 'damage' || keywords[i] == 'Damage'){
          score[4] += 10;
      }
      if(keywords[i] == 'defect' || keywords[i] == 'Defect' || keywords[i] == 'Defected' || keywords[i] == 'defected'){
          score[4] += 10;
      }

      //Technical Issues
      if(keywords[i] == 'error' || keywords[i] == 'Error'){
          score[5] += 10;
      }
      if(keywords[i] == 'incorrect' || keywords[i] == 'Incorrect'){
          score[5] += 10;
      }
      if(keywords[i] == 'issues' || keywords[i] == 'Issues' || keywords[i] == 'Issue' || keywords[i] == 'issue'){
          score[4] += 10;
      }



  }

  let maxScore = 0;
  let maxIndex = 0;
  
  for(let j = 0; j < score.length; j++){
      if(score[j] > maxScore){
          maxScore = score[j];
          maxIndex = j;
      }
  }

  return categories[maxIndex]
}

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

    const category = categorizer(subject);
  
    const newInquiry = new Inquiry({
        name, 
        phone, 
        email, 
        subject, 
        message,
        category
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