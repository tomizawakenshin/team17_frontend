import { Comment } from "@/models/comment";
import { Hanabi } from "@/models/hanabi";
import { Like } from "@/models/like";
import { User } from "@/models/user";

export const getAllLike = async (): Promise<Like[]> => {
    const res = await fetch(`http://localhost:3002/likss`,{
        cache: "no-store", //SSR
    });
    const likes = res.json();

    return likes;
};