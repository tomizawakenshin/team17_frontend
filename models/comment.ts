import { Hanabi } from '@/models/hanabi';
import { Like } from './like';
import { User } from "./user";

export interface Comment{
    Content: string;
    UserID: number;
    User: User;
    HanabiID: number;
    Hanabi: Hanabi;
    Likes: Like[];
    LikeCount: number;
    HasLiked: boolean;
  }