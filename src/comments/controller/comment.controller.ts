import { Request, Response } from "express";
import { commentDto } from "../dto/comment.dto";
import { CommentService } from "../service/comment.service";


export const commentController = {
    async getUserComment (req:Request, res:Response){
        try {
    
        const commentInformation = req.body as commentDto
        const commentResult = await CommentService.userComments(commentInformation)
        return res
        .status(200)
        .send({ message: "comments added succesfully", commentResult });
    }
    catch (err: any) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });

 }
    

}


}

            
       
