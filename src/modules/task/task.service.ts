import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { TaskDTO, TaskTypeDTO } from './dto/task.dto'
import { UpdateTaskDTO } from './dto/updatetask.dto'
import { ScheduleDTO } from '../schedule/dto/schedule.dto'
import { CreateTaskDTO } from './dto/createtask.dto'

export enum TaskType {
  BREAK = 'BREAK',
  WORK = 'WORK',
}

export interface Task {
  id: string
  accountId: number
  type: TaskType
  startTime: Date
  duration: number
  scheduleId: string
  schedule: {
    id: string
    accountId: number
    agentId: number
    startTime: Date
    endTime: Date
  }
}

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDTO): Promise<TaskDTO> {
    const task = await this.prisma.task.create({
      data,
      include: {
        schedule: true,
      },
    })

    return {
      id: task.id,
      accountId: task.accountId,
      startTime: task.startTime,
      duration: task.duration,
      type: task.type as unknown as TaskTypeDTO,
      scheduleId: task.scheduleId,
      schedule: {
        id: task.schedule.id,
        accountId: task.schedule.accountId,
        agentId: task.schedule.agentId,
        startTime: task.schedule.startTime,
        endTime: task.schedule.endTime,
      } as ScheduleDTO,
    } as TaskDTO
  }

  async getTasks(): Promise<TaskDTO[]> {
    const tasks = await this.prisma.task.findMany({
      include: {
        schedule: true, // Include the schedule in the query
      },
    })

    return tasks.map((task) => ({
      id: task.id,
      accountId: task.accountId,
      startTime: task.startTime,
      duration: task.duration,
      type: task.type as unknown as TaskTypeDTO, // Should transform ???
      scheduleId: task.scheduleId,
      schedule: {
        id: task.schedule.id,
        accountId: task.schedule.accountId,
        agentId: task.schedule.agentId,
        startTime: task.schedule.startTime,
        endTime: task.schedule.endTime,
      } as ScheduleDTO,
    }))
  }

  async getTaskForId(id: string): Promise<TaskDTO | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        schedule: true, // Include the schedule in the query
      },
    })

    if (!task) return null

    return {
      id: task.id,
      accountId: task.accountId,
      startTime: task.startTime,
      duration: task.duration,
      type: task.type as unknown as TaskTypeDTO,
      scheduleId: task.scheduleId,
      schedule: {
        id: task.schedule.id,
        accountId: task.schedule.accountId,
        agentId: task.schedule.agentId,
        startTime: task.schedule.startTime,
        endTime: task.schedule.endTime,
      } as ScheduleDTO,
    } as TaskDTO
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDTO): Promise<TaskDTO> {
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        accountId: updateTaskDto.accountId,
        startTime: updateTaskDto.startTime,
        duration: updateTaskDto.duration,
        type: updateTaskDto.type,
        scheduleId: updateTaskDto.scheduleId,
      },
      include: {
        schedule: true,
      },
    })

    return {
      id: updatedTask.id,
      accountId: updatedTask.accountId,
      startTime: updatedTask.startTime,
      duration: updatedTask.duration,
      type: updatedTask.type as unknown as TaskTypeDTO,
      scheduleId: updatedTask.scheduleId,
      schedule: {
        id: updatedTask.schedule.id,
        accountId: updatedTask.schedule.accountId,
        agentId: updatedTask.schedule.agentId,
        startTime: updatedTask.schedule.startTime,
        endTime: updatedTask.schedule.endTime,
      } as ScheduleDTO,
    } as TaskDTO
  }

  async deleteTask(id: string): Promise<TaskDTO> {
    const deletedTask = await this.prisma.task.delete({
      where: { id },
      include: {
        schedule: true,
      },
    })

    return this.transformTaskToDTO({
      ...deletedTask,
      type: deletedTask.type as TaskType, // Might need to transform this
    })
  }

  private transformTaskToDTO(task: Task): TaskDTO {
    return {
      id: task.id,
      accountId: task.accountId,
      startTime: task.startTime,
      duration: task.duration,
      type: task.type as unknown as TaskTypeDTO,
      scheduleId: task.scheduleId,
      schedule: {
        id: task.schedule.id,
        accountId: task.schedule.accountId,
        agentId: task.schedule.agentId,
        startTime: task.schedule.startTime,
        endTime: task.schedule.endTime,
      } as ScheduleDTO,
    } as TaskDTO
  }
}
