import { Test, TestingModule } from '@nestjs/testing'
import { TaskController } from '../../../../src/modules/task/task.controller'
import { TaskService } from '../../../../src/modules/task/task.service'
import { CreateTaskDTO } from '../../../../src/modules/task/dto/createtask.dto'
import { TaskDTO, TaskTypeDTO } from '../../../../src/modules/task/dto/task.dto'
import { UpdateTaskDTO } from '../../../../src/modules/task/dto/updatetask.dto'
import { ScheduleDTO } from 'src/modules/schedule/dto/schedule.dto'

describe('TaskController', () => {
  let taskController: TaskController
  let taskService: TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn(),
            getTaskForId: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile()

    taskController = module.get<TaskController>(TaskController)
    taskService = module.get<TaskService>(TaskService)
  })

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDTO = {
        accountId: 123,
        duration: 60,
        startTime: new Date(),
        scheduleId: '456',
        type: TaskTypeDTO.WORK,
      }
      const result: TaskDTO = {
        id: '1',
        accountId: 123,
        type: TaskTypeDTO.WORK,
        startTime: new Date(),
        duration: 60,
        scheduleId: '456',
        schedule: {
          id: '456',
          accountId: 123,
          agentId: 789,
          startTime: new Date(),
          endTime: new Date(),
        } as ScheduleDTO,
      }

      jest.spyOn(taskService, 'createTask').mockResolvedValue(result)

      expect(await taskController.create(createTaskDto)).toBe(result)
    })
  })

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: TaskDTO[] = [{
        id: '1',
        accountId: 123,
        type: TaskTypeDTO.WORK,
        startTime: new Date(),
        duration: 60,
        scheduleId: '456',
        schedule: {
          id: '456',
          accountId: 123,
          agentId: 789,
          startTime: new Date(),
          endTime: new Date(),
        } as ScheduleDTO,
      }]

      jest.spyOn(taskService, 'getTasks').mockResolvedValue(result)

      expect(await taskController.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result: TaskDTO = {
        id: '1',
        accountId: 123,
        type: TaskTypeDTO.WORK,
        startTime: new Date(),
        duration: 60,
        scheduleId: '456',
        schedule: {
          id: '456',
          accountId: 123,
          agentId: 789,
          startTime: new Date(),
          endTime: new Date(),
        } as ScheduleDTO,
      }

      jest.spyOn(taskService, 'getTaskForId').mockResolvedValue(result)

      expect(await taskController.findOne('1')).toBe(result)
    })
  })

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDTO = {
        accountId: 123,
        duration: 60,
        startTime: new Date(),
        scheduleId: '456',
        type: TaskTypeDTO.WORK
      }
      const result: TaskDTO = {
        id: '1',
        accountId: 123,
        type: TaskTypeDTO.WORK,
        startTime: new Date(),
        duration: 60,
        scheduleId: '456',
        schedule: {
          id: '456',
          accountId: 123,
          agentId: 789,
          startTime: new Date(),
          endTime: new Date(),
        } as ScheduleDTO,
      }

      jest.spyOn(taskService, 'updateTask').mockResolvedValue(result)

      expect(await taskController.update('1', updateTaskDto)).toBe(result)
    })
  })

  describe('remove', () => {
    it('should delete a task', async () => {
      const result: TaskDTO = {
        id: '1',
        accountId: 123,
        type: TaskTypeDTO.WORK,
        startTime: new Date(),
        duration: 60,
        scheduleId: '456',
        schedule: {
          id: '456',
          accountId: 123,
          agentId: 789,
          startTime: new Date(),
          endTime: new Date(),
        } as ScheduleDTO,
      }

      jest.spyOn(taskService, 'deleteTask').mockResolvedValue(result)

      expect(await taskController.remove('1')).toBe(result)
    })
  })
})