import axios from "axios";
import type { PlayerInfo } from "../types/PlayerInfo";

export const postCreateRoom = async (nickname: string) => {
    const response = await axios.post<PlayerInfo>("http://localhost:8080/api/gameRoom/create", { nickname });
    return response.data;
};