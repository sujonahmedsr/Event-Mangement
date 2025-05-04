import express, { Application, NextFunction, Request, Response } from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './router';
const app: Application = express();

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Event Management server..",
  });
});

// all routes 
app.use("/api/v1", router);

// Global Error Handler 
app.use(globalErrorHandler)

// Api not found 
app.use(notFound);

export default app;