import asyncHandler from "express-async-handler";
import Voucher from "../models/voucherModel.js";

// @DESC Fetch all voucher
// @ROUTE /api/voucher
// @METHOD GET
export const getAll = asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
  
      const count = await Voucher.countDocuments({ ...keyword });
      const vouchers = await Voucher.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    
      res.status(201).json({
        success: true,
        vouchers,
        page,
        pages: Math.ceil(count / pageSize),
      });
    });

    // @DESC Fetch single voucher
// @ROUTE /api/voucher/:id
// @METHOD GET
export const getSingle = asyncHandler(async (req, res) => {
    const voucher = await Voucher.findById(req.params.id);
  
    if (!voucher) {
      res.status(401);
      throw new Error("Voucher not found");
    }
  
    res.status(201).json({ success: true, voucher });
  });
  

  // @Desc Create voucher
// @Route /api/voucher
// @Method POST
export const createVoucher = asyncHandler(async (req, res) => {
    const voucher = new Voucher({
        type: req.body.type,
        code: req.body.type,
        value: req.body.type,
        expirationDate: req.body.expirationDate 
    });
  
    const createdVoucher = await voucher.save();
  
    res.status(201).json({ success: true, voucher: createdVoucher });
  });

  // @Desc Update Voucher
// @Route /api/Voucher/:id
// @Method PUT
export const updateVoucher = asyncHandler(async (req, res) => {
    let voucher = await Voucher.findById(req.params.id);
  
    if (voucher) {
      voucher.type = req.body.type;
      voucher.code = req.body.code;
      voucher.value = req.body.value;
      voucher.expirationDate = req.body.expirationDate;
  
      const updatedVoucher = await voucher.save();
  
      res.status(201).json({ success: true, voucher: updatedVoucher });
    } else {
      res.status(401);
      throw new Error("Voucher not found");
    }
  });
  
  // @Desc Delete Voucher
// @Route /api/Voucher/:id
// @Method DELETE
export const deleteVoucher = asyncHandler(async (req, res) => {
    let voucher = await Voucher.findById(req.params.id);
  
    if (!voucher) {
      res.status(401);
      throw new Error("Voucher not found");
    }
  
    await Voucher.findOneAndDelete(req.params.id);
  
    res.status(201).json({ message: "Voucher deleted" });
  });
  