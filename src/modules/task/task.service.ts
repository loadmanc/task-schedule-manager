import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Task, Type } from '@prisma/client'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: {
    accountId: number, startTime: Date, duration: number, type: Type, scheduleId: string
  }): Promise<Task> {
    return this.prisma.task.create({
      data,
    })
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async getTaskForId(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    })
  }

  async updateTask(id: string, data: {
    accountId: number, startTime: Date, duration: number, type: Type, scheduleId: string
  }): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    })
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    })
  }
}
