import { Router } from "express";

import moviesRouter from "./movies.routes.js";
import authRouter from "./auth.routes.js";
import watchlistRouter from './watchlist.routes.js';


const router = Router();

router.use("/movies", moviesRouter);
router.use("/auth", authRouter);
router.use("/watchlist", watchlistRouter);

export default router;