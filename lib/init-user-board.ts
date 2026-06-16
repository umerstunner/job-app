import connectDB from "./db"
import {Board,Column} from "./models"

const DEFAULT_COLUMNS = [
    { name: "Wishlist", order: 0 },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "Offer", order: 3 },
    { name: "Rejected", order: 4 },
]

export async function initializeUserBoard(userId: string) {
    try{
        await connectDB()

        // Check if the user already has a board
        const existingBoard = await Board.findOne({userId: userId, name: "Job Hunt"})
        if(existingBoard){
            return existingBoard
        }

        // Creating a new board for the user
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: []
        });

        // Creating default columns for the board
        const columns = await Promise.all(
            DEFAULT_COLUMNS.map((col) => {
                return Column.create({
                    name: col.name,
                    boardId: board._id,
                    order: col.order,
                    jobApplications: []
                });
            })
        );

        board.columns = columns.map(col => col._id);
        await board.save();
        return board
        
    } catch (err) {
        throw err;
    }
}