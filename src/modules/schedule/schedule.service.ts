import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { CreateScheduleDTO } from './dto/createschedule.dto'
import { UpdateScheduleDTO } from './dto/updateschedule.dto'
import { TaskTypeDTO } from '../task/dto/task.dto'
import { ScheduleDTO } from './dto/schedule.dto'

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(
    createScheduleDto: CreateScheduleDTO,
  ): Promise<ScheduleDTO> {
    return this.prisma.schedule.create({
      data: {
        accountId: createScheduleDto.accountId,
        agentId: createScheduleDto.agentId,
        startTime: createScheduleDto.startTime,
        endTime: createScheduleDto.endTime,
        tasks: {
          create: createScheduleDto.tasks,
        },
      },
    })
  }

  async getSchedules(): Promise<ScheduleDTO[]> {
    return this.prisma.schedule.findMany()
  }

  async getScheduleForId(id: string): Promise<ScheduleDTO | null> {
    return this.prisma.schedule.findUnique({
      where: { id },
    })
  }

  async updateSchedule(
    id: string,
    updateScheduleDto: UpdateScheduleDTO,
  ): Promise<ScheduleDTO> {
    return this.prisma.schedule.update({
      where: { id },
      data: {
        accountId: updateScheduleDto.accountId,
        agentId: updateScheduleDto.agentId,
        startTime: updateScheduleDto.startTime,
        endTime: updateScheduleDto.endTime,
        tasks: {
          create: updateScheduleDto.tasks.map((task) => ({
            ...task,
            type: task.type as TaskTypeDTO,
          })),
        },
      },
    })
  }

  async deleteSchedule(id: string): Promise<ScheduleDTO> {
    return this.prisma.schedule.delete({
      where: { id },
    })
  }
}
