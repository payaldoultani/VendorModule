import { Router } from "express";
import {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../Controllers/vendorController";

const router = Router();

router.get("/getVendorList", getVendors);
router.get("/getVendorList/:id", getVendorById);
router.post("/create", createVendor);
router.put("/update/:id", updateVendor);
router.delete("/delete/:id", deleteVendor);

export default router;
