import { NextFunction, query, Request, Response } from "express";
import Vendor from "../Models/vendorModel";
import { vendorValidationSchema } from "../Validator/vendorValidation";
import AppError from "../utils/AppError";

// Get all vendors
export const getVendors = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit, sortBy, order = "asc", ...filter } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Validate the sort field and order
    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions: any = sortBy ? { [sortBy as string]: sortOrder } : {};
    const vendors = await Vendor.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOptions);
    res.status(200).json(vendors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vendor by ID
export const getVendorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    res.status(200).json(vendor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vendor
export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = vendorValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error.details);

      return next(new AppError(error.details[0].message, 400));
    }

    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error: any) {
    next(error);
  }
};

// Update a vendor
export const updateVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    res.status(200).json(vendor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a vendor
export const deleteVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndDelete(id);
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
