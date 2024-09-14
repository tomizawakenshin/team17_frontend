import { Comment } from "@/models/comment";
import { Hanabi } from "@/models/hanabi";
import { Like } from "@/models/like";
import { User } from "@/models/user";

export const getAllUser = async (): Promise<User[]> => {
    const res = await fetch(`http://localhost:3002/users`,{
        cache: "no-store", //SSR
    });
    const users = res.json();

    return users;
};