import { error } from "console";
import {prisma} from "../config/db";


const addToWatchList = async (req,res)=>{
    const {movieId, status, rating, notes, userId} = req.body;

    const movie = await prisma.movie.findUnique({
        where: {id: movieId},
    })

    if(!movie){
        return res.status(404).json({error: "movie not found"})
    }

    //check if already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId:movieId
            }
        }
    })
    if(existingInWatchlist){
        return res.status(404).json({error: "Movie already in the watchlist"})
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        }
    })

    res.status(201).json({
        status: 'success',
        data: {
            watchlistItem,
        }
    })
}


export {addToWatchList}