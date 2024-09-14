import { Comment } from "@/models/comment";
import { Hanabi } from "@/models/hanabi";
import { Like } from "@/models/like";
import { User } from "@/models/user";

export const getAllComment = async (): Promise<Comment[]> => {
    const res = await fetch(`http://localhost:3002/comments`,{
        cache: "no-store", //SSR
    });
    const comments = res.json();

    return comments;
};