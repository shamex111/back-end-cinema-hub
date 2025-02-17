import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { returnReviewObject } from './objects/return-review.object';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async leave(userId: string, movieId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        ...dto,
        movie: {
          connect: {
            id: movieId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  /*Запросы для админа */

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });
  }
  async delete(id: string) {
    try {
      const deleteReview = await this.prisma.review.delete({
        where: { id },
      });
      return deleteReview;
    } catch (error) {
      throw new NotFoundException('Отзыв не найден');
    }
  }
}
