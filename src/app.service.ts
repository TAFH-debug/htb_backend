import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import OpenAI from 'openai';

const openai = new OpenAI();

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async search(query: string) {
    const books = await this.prismaService.book.findMany({
      take: 2,
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    const users = await this.prismaService.user.findMany({
      take: 2,
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return {
      books,
      users,
    };
  }

  async dailyQuiz(userID: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userID },
      include: {
        books: true,
      },
    });

    const book = user.books[Math.floor(Math.random() * user.books.length)];

    const prompt = `You are a quiz generator bot. 
    Your output must be in json format.
    Your task is to generate a quiz question based on content of the book.
    Example output:
    {
      "question": "What is the capital of the United States?",
      "answers": ["New York", "Los Angeles", "Chicago", "Washington, D.C."],
      "correctAnswer": 3
    }`;

    const userPrompt = `Book title: ${book.title}
    Book author: ${book.author}
    Book description: ${book.description}`;

    const res = openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    return JSON.parse((await res).choices[0].message.content);
  }

  dailyAnswer(userID: string) {
    return this.prismaService.user.update({
      where: { id: userID },
      data: {
        score: {
          increment: 10,
        },
      },
    });
  }
}
