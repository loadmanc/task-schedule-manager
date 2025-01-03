import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from '../../../../src/modules/task/task.service'
import { PrismaService } from '../../../../src/prisma.service'
import { CreateTaskDTO } from '../../../../src/modules/task/dto/createtask.dto'
import { UpdateTaskDTO } from '../../../../src/modules/task/dto/updatetask.dto'
import { TaskTypeDTO } from 'src/modules/task/dto/task.type.dto'

describe('TaskService', () => {
  let service: TaskService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile()

    service = module.get<TaskService>(TaskService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDTO = {
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
      }

      const task = {
        id: 'task-1',
        ...createTaskDto,
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: new Date(),
          endTime: new Date(),
        },
      }

      jest.spyOn(prisma.task, 'create').mockResolvedValue(task)

      const result = await service.createTask(createTaskDto)
      expect(result).toEqual({
        id: 'task-1',
        accountId: 1,
        startTime: createTaskDto.startTime,
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: task.schedule.startTime,
          endTime: task.schedule.endTime,
        },
      })
    })
  })

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = [
        {
          id: 'task-1',
          accountId: 1,
          startTime: new Date(),
          duration: 60,
          type: TaskTypeDTO.WORK,
          scheduleId: 'schedule-1',
          schedule: {
            id: 'schedule-1',
            accountId: 1,
            agentId: 1,
            startTime: new Date(),
            endTime: new Date(),
          },
        },
      ]

      jest.spyOn(prisma.task, 'findMany').mockResolvedValue(tasks)

      const result = await service.getTasks()
      expect(result).toEqual(
        tasks.map((task) => ({
          id: task.id,
          accountId: task.accountId,
          startTime: task.startTime,
          duration: task.duration,
          type: TaskTypeDTO.WORK,
          scheduleId: task.scheduleId,
          schedule: {
            id: task.schedule.id,
            accountId: task.schedule.accountId,
            agentId: task.schedule.agentId,
            startTime: task.schedule.startTime,
            endTime: task.schedule.endTime,
          },
        })),
      )
    })
  })

  describe('getTaskForId', () => {
    it('should return a task for the given id', async () => {
      const task = {
        id: 'task-1',
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: new Date(),
          endTime: new Date(),
        },
      }

      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(task)

      const result = await service.getTaskForId('task-id')
      expect(result).toEqual({
        id: 'task-1',
        accountId: 1,
        startTime: task.startTime,
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: task.schedule.startTime,
          endTime: task.schedule.endTime,
        },
      })
    })

    it('should return null if task not found', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null)

      const result = await service.getTaskForId('non-existent-id')
      expect(result).toBeNull()
    })
  })

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDTO = {
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
      }

      const updatedTask = {
        id: 'task-1',
        ...updateTaskDto,
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: new Date(),
          endTime: new Date(),
        },
      }

      jest.spyOn(prisma.task, 'update').mockResolvedValue(updatedTask)

      const result = await service.updateTask('task-1', updateTaskDto)
      expect(result).toEqual({
        id: 'task-1',
        accountId: 1,
        startTime: updateTaskDto.startTime,
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: updatedTask.schedule.startTime,
          endTime: updatedTask.schedule.endTime,
        },
      })
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = {
        id: 'task-1',
        accountId: 1,
        startTime: new Date(),
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: new Date(),
          endTime: new Date(),
        },
      }

      jest.spyOn(prisma.task, 'delete').mockResolvedValue(task)

      const result = await service.deleteTask('task-1')
      expect(result).toEqual({
        id: 'task-1',
        accountId: 1,
        startTime: task.startTime,
        duration: 60,
        type: TaskTypeDTO.WORK,
        scheduleId: 'schedule-1',
        schedule: {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: task.schedule.startTime,
          endTime: task.schedule.endTime,
        },
      })
    })
  })
})
