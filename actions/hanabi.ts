import { Hanabi } from "@/models/hanabi";

export const getAllHanabi = async (date: string): Promise<Hanabi[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    // フロントエンドでリクエストをスラッシュなしのURLに変更
    const res = await fetch(`https://hanabibackenddeploy-production.up.railway.app/hanabi/getAll?date=${date}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include', // 認証情報を送信
    });

    if (!res.ok) {
        throw new Error("Failed to fetch hanabis");
    }

    const hanabis = await res.json();
    return hanabis;
};
