import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Schedule, Prisma } from '@prisma/client'

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(data: Prisma.ScheduleCreateInput ): Promise<Schedule> {
    return this.prisma.schedule.create({
      data,
    })
  }

  async getSchedules(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany()
  }

  async getScheduleForId(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.findUnique({
      where: { id },
    })
  }

  async updateSchedule(id: string, data: Prisma.ScheduleUpdateInput): Promise<Schedule> {
    return this.prisma.schedule.update({
      where: { id },
      data,
    })
  }

  async deleteSchedule(id: string): Promise<Schedule> {
    return this.prisma.schedule.delete({
      where: { id },
    })
  }
}
