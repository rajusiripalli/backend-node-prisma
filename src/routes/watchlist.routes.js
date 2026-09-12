import { Router } from "express";
import { addToWatchList } from "../controllers/watchlistController";

const router = Router();

router.post("/", addToWatchList);

export default router;