import { Comment } from "./comment";
import { User } from "./user";

export interface Like{
    UserId: number;
    User: User;
    CommentID: number;
    Comment: Comment;
  }