import { CommentModel } from "../comment.model";
import { commentDto } from "../dto/comment.dto";

export const CommentService ={
    async userComments(comment:commentDto){
    const newUserComment = await CommentModel.create(comment)
    return newUserComment

    }
}