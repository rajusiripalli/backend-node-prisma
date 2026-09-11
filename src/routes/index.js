import { Router } from "express";

import moviesRouter from "./movies.routes.js";
import authRouter from "./auth.routes.js";


const router = Router();

router.use("/movies", moviesRouter);
router.use("/auth", authRouter);

export default router;