import express, { Request,Response,NextFunction,Application } from "express";
import vendorRoutes from "./Routes/vendorRoutes";
import globalError from "./Controllers/ErrorController"
import AppError from "./utils/AppError";

const app: Application = express();

app.use(express.json());

// Vendor API routes
app.use("/api/vendor", vendorRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
  next(new AppError(`can't find ${req.originalUrl} on this Server`,404));
})

app.use(globalError)

export default app;
