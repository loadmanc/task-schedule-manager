import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { CreateScheduleDTO } from './dto/createschedule.dto'
import { UpdateScheduleDTO } from './dto/updateschedule.dto'
import { ScheduleDTO } from './dto/schedule.dto'
import { TaskDTO } from '../task/dto/task.dto'
import { Schedule } from 'src/common/types/schedule'
import { Task } from 'src/common/types/task'

@Injectable()
/**
 * Service responsible for managing schedules.
 */
export class ScheduleService {
  /**
   * Constructs a new ScheduleService.
   * @param prisma - The PrismaService instance used for database operations.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new schedule.
   * @param createScheduleDto - The data transfer object containing the details of the schedule to create.
   * @returns A promise that resolves to the created ScheduleDTO.
   */
  async createSchedule(
    createScheduleDto: CreateScheduleDTO,
  ): Promise<ScheduleDTO> {
    const schedule = await this.prisma.schedule.create({
      data: {
        accountId: createScheduleDto.accountId,
        agentId: createScheduleDto.agentId,
        startTime: createScheduleDto.startTime,
        endTime: createScheduleDto.endTime,
        tasks: {
          create: createScheduleDto.tasks?.map(task => ({
            accountId: task.accountId,
            startTime: new Date(task.startTime),
            duration: task.duration,
            type: task.type,
            schedule: {
              connect: { id: schedule.id },
            },
          })),
        },
      },
      include: {
        tasks: true,
      },
    })

    return this.transformScheduleToScheduleDTO(schedule)
  }

  /**
   * Retrieves all schedules.
   * @returns A promise that resolves to an array of ScheduleDTOs.
   */
  async getSchedules(): Promise<ScheduleDTO[]> {
    const schedules = await this.prisma.schedule.findMany({
      include: {
        tasks: true,
      },
    })

    return schedules.map(
      schedule => this.transformScheduleToScheduleDTO(schedule),
    )
  }

  /**
   * Retrieves a schedule by its ID.
   * @param id - The ID of the schedule to retrieve.
   * @returns A promise that resolves to the ScheduleDTO if found, or null if not found.
   */
  async getScheduleForId(id: string): Promise<ScheduleDTO | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    })

    if (!schedule) return null

    return this.transformScheduleToScheduleDTO(schedule)
  }

  /**
   * Updates an existing schedule.
   * @param id - The ID of the schedule to update.
   * @param updateScheduleDto - The data transfer object containing the updated details of the schedule.
   * @returns A promise that resolves to the updated ScheduleDTO.
   */
  async updateSchedule(
    id: string,
    updateScheduleDto: UpdateScheduleDTO,
  ): Promise<ScheduleDTO> {
    const updatedSchedule = await this.prisma.schedule.update({
      where: { id },
      data: {
        accountId: updateScheduleDto.accountId,
        agentId: updateScheduleDto.agentId,
        startTime: updateScheduleDto.startTime,
        endTime: updateScheduleDto.endTime,
        tasks: {
          update: updateScheduleDto.tasks?.map(task => ({
            where: { id: task.id },
            data: {
              accountId: task.accountId,
              startTime: new Date(task.startTime),
              duration: task.duration,
              type: task.type,
            },
          })),
        },
      },
      include: {
        tasks: true,
      },
    })

    return this.transformScheduleToScheduleDTO(updatedSchedule)
  }

  /**
   * Deletes a schedule by its ID.
   * @param id - The ID of the schedule to delete.
   * @returns A promise that resolves when the schedule is deleted.
   */
  async deleteSchedule(id: string): Promise<void> {
    await this.prisma.schedule.delete({
      where: { id },
    })
  }

  /**
   * Transforms a Schedule entity to a ScheduleDTO.
   * @param schedule - The Schedule entity to transform.
   * @returns The transformed ScheduleDTO.
   */
  private transformScheduleToScheduleDTO(schedule: Schedule): ScheduleDTO {
    return {
      id: schedule.id,
      accountId: schedule.accountId,
      agentId: schedule.agentId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      tasks: schedule.tasks.map((task: Task) => ({
        id: task.id,
        accountId: task.accountId,
        startTime: task.startTime,
        duration: task.duration,
        type: task.type,
        scheduleId: task.scheduleId,
      } as TaskDTO)),
    } as ScheduleDTO
  } 
}