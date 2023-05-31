export default class Tweet {
    id: number | null;
    Content: string;
    Author: string;
    likes: number;
    createdAt: Date;
    userId: number;

    // constructor
    constructor(
        content: string,
        author: string,
        likes: number,
        createdAt: Date,
        userId: number,
        id: number | null = null
      ) {
        this.id = id;
        this.Content = content;
        this.Author = author;
        this.likes = likes;
        this.createdAt = createdAt;
        this.userId = userId;
      }
}