import { Comment } from "@/models/comment";
import { Hanabi } from "@/models/hanabi";
import { Like } from "@/models/like";
import { User } from "@/models/user";

export const getAllHanabi = async (): Promise<Hanabi[]> => {
    const res = await fetch(`http://localhost:3002/hanabis`,{
        cache: "no-store", //SSR
    });
    const hanabis = res.json();

    return hanabis;
};