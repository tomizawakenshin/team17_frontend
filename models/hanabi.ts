import { User } from "./user";

export interface Hanabi{
  Name: string;
  Discription: string;
  Photo: string;
  UserID: number;
  User: User;
  Tag: string;
  CommentCount: number;
  Comment: Comment[];
}