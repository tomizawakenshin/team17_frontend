import { Hanabi } from "@/models/hanabi";

export const getAllHanabi = async (): Promise<Hanabi[]> => {
    const res = await fetch(`http://localhost:3002/hanabis`, {
        cache: "no-store", //SSR
    });
    const hanabis = res.json();

    return hanabis;
};