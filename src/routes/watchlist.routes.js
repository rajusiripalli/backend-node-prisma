import { Router } from "express";
import { addToWatchList, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlistController";
import { authMiddleware } from "../middleware/authMiddleware";
import { addToWatchlistSchema } from "../validators/watchlistValidator";

const router = Router();

router.use(authMiddleware)

router.post("/", validateRequest(addToWatchlistSchema), addToWatchList);
router.delete('/:id', removeFromWatchlist)
router.delete('/:id', updateWatchlistItem)

export default router;