import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { TaskDTO } from './dto/task.dto'
import { UpdateTaskDTO } from './dto/updatetask.dto'
import { CreateTaskDTO } from './dto/createtask.dto'
import { Task } from 'src/common/types/task'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDTO): Promise<TaskDTO> {
    const task = await this.prisma.task.create({
      data,
    })

    return this.transformTaskToTaskDTO(task)
  }

  async getTasks(): Promise<TaskDTO[]> {
    const tasks = await this.prisma.task.findMany()

    return tasks.map(
      task => this.transformTaskToTaskDTO(task),
    )
  }

  async getTaskForId(id: string): Promise<TaskDTO | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    })

    if (!task) return null
    return this.transformTaskToTaskDTO(task)
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
    })

    return this.transformTaskToTaskDTO(updatedTask)
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    })
  }

  private transformTaskToTaskDTO(task: Task): TaskDTO {
    return {
      id: task.id,
      accountId: task.accountId,
      startTime: task.startTime,
      duration: task.duration,
      type: task.type,
      scheduleId: task.scheduleId,
    } as TaskDTO
  }
}
