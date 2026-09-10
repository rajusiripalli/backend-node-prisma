import { Router } from "express";

import moviesRouter from "./movies.routes.js";


const router = Router();

router.use("/movies", moviesRouter);

export default router;