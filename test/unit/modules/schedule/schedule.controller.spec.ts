import { Test, TestingModule } from '@nestjs/testing'
import { ScheduleController } from '../../../../src/modules/schedule/schedule.controller'
import { ScheduleService } from '../../../../src/modules/schedule/schedule.service'
import { CreateScheduleDTO } from '../../../../src/modules/schedule/dto/createschedule.dto'
import { UpdateScheduleDTO } from '../../../../src/modules/schedule/dto/updateschedule.dto'
import { ScheduleDTO } from 'src/modules/schedule/dto/schedule.dto'

describe('ScheduleController', () => {
  let scheduleController: ScheduleController
  let scheduleService: ScheduleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: {
            createSchedule: jest.fn(),
            getSchedules: jest.fn(),
            getScheduleForId: jest.fn(),
            updateSchedule: jest.fn(),
            deleteSchedule: jest.fn(),
          },
        },
      ],
    }).compile()

    scheduleController = module.get<ScheduleController>(ScheduleController)
    scheduleService = module.get<ScheduleService>(ScheduleService)
  })

  describe('create', () => {
    it('should create a new schedule', async () => {
      const createScheduleDto: CreateScheduleDTO = {
        accountId: 123,
        agentId: 321,
        startTime: new Date(),
        endTime: new Date(),
      }
      // TODO: Replace this with a mock Schedule object
      const result: ScheduleDTO = { /* mock data */ } as ScheduleDTO

      jest.spyOn(scheduleService, 'createSchedule').mockResolvedValue(result)

      expect(await scheduleController.create(createScheduleDto)).toBe(result)
    })
  })

  describe('findAll', () => {
    it('should return an array of schedules', async () => {
      // TODO: Replace this with a mock Schedule object
      const result: ScheduleDTO[] = [{ /* mock data */ }] as ScheduleDTO[]

      jest.spyOn(scheduleService, 'getSchedules').mockResolvedValue(result)

      expect(await scheduleController.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return a single schedule', async () => {
      const id = '1'
      // TODO: Replace this with a mock Schedule object
      const result: ScheduleDTO = { /* mock data */ } as ScheduleDTO

      jest.spyOn(scheduleService, 'getScheduleForId').mockResolvedValue(result)

      expect(await scheduleController.findOne(id)).toBe(result)
    })
  })

  describe('update', () => {
    it('should update a schedule', async () => {
      const id = '1'
      const updateScheduleDto: UpdateScheduleDTO = {
        accountId: 123,
        agentId: 321,
        startTime: new Date(),
        endTime: new Date(),
      }
      const result: ScheduleDTO = { 
        accountId: 123,
        agentId: 321,
        startTime: new Date(),
        endTime: new Date(),
      } as ScheduleDTO

      jest.spyOn(scheduleService, 'updateSchedule').mockResolvedValue(result)

      expect(await scheduleController.update(id, updateScheduleDto)).toBe(result)
    })
  })

  describe('remove', () => {
    it('should delete a schedule', async () => {
      const id = '1'
      jest.spyOn(scheduleService, 'deleteSchedule').mockResolvedValueOnce(undefined)
      expect(await scheduleController.remove(id)).toHaveBeenCalled()
    })
  })
})