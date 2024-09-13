import { Hanabi } from '@/models/hanabi';
import { Comment } from './comment';
import { Like } from './like';

export interface User{
    Username: string;
    Email: string;
    Password: string;
    IconPhoto: string;
    Hanabis: Hanabi[];
    Comments: Comment[];
    Likes: Like[];
  }