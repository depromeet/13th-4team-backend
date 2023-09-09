import { Injectable } from '@nestjs/common';
import { AiResume, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class AiResumeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findOneByFilter(where: Prisma.AiResumeWhereInput): Promise<AiResume> {
    return await this.prisma.aiResume.findFirst({ where });
  }

  public async getAiResumeByUserId(userId: number, aiKeyword?: string) {
    let where = <Prisma.AiResumeWhereInput>{ userId };

    if (aiKeyword) {
      where = { userId, AiResumeCapabilities: { some: { Capability: { keyword: { equals: aiKeyword } } } } };
    }

    return await this.prisma.aiResume.findMany({
      select: {
        id: true,
        content: true,
        updatedAt: true,
        experienceId: true,
        AiResumeCapabilities: { select: { Capability: { select: { keyword: true } } } },
      },
      where,
    });
  }

  public async getAiResumeCount(userId: number, aiKeyword?: string): Promise<number> {
    let where = <Prisma.AiResumeWhereInput>{ userId };

    if (aiKeyword) {
      where = { userId, AiResumeCapabilities: { some: { Capability: { keyword: { equals: aiKeyword } } } } };
    }

    return await this.prisma.aiResume.count({ where });
  }
}
