import { Test, TestingModule } from '@nestjs/testing'
import { ScheduleService } from '../../../../src/modules/schedule/schedule.service'
import { PrismaService } from '../../../../src/prisma.service'
import { CreateScheduleDTO } from '../../../../src/modules/schedule/dto/createschedule.dto'
import { UpdateScheduleDTO } from '../../../../src/modules/schedule/dto/updateschedule.dto'
import { ScheduleDTO } from '../../../../src/modules/schedule/dto/schedule.dto'

describe('ScheduleService', () => {
  let service: ScheduleService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService, PrismaService],
    }).compile()

    service = module.get<ScheduleService>(ScheduleService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createSchedule', () => {
    it('should create a new schedule', async () => {
      const createScheduleDto: CreateScheduleDTO = {
        accountId: 123,
        agentId: 321,
        startTime: new Date(),
        endTime: new Date(),
        tasks: [],
      }

      const result: ScheduleDTO = {
        id: 'schedule-1',
        accountId: createScheduleDto.accountId,
        agentId: createScheduleDto.agentId,
        startTime: createScheduleDto.startTime,
        endTime: createScheduleDto.endTime,
        tasks: [],
      }

      jest.spyOn(prisma.schedule, 'create').mockResolvedValue(result)

      expect(await service.createSchedule(createScheduleDto)).toEqual(result)
    });
  });

  describe('getSchedules', () => {
    it('should return an array of schedules', async () => {
      const result: ScheduleDTO[] = [
        {
          id: 'schedule-1',
          accountId: 1,
          agentId: 1,
          startTime: new Date(),
          endTime: new Date(),
          tasks: [],
        },
        {
          id: 'schedule-2',
          accountId: 2,
          agentId: 2,
          startTime: new Date(),
          endTime: new Date(),
          tasks: [],
        },
      ]

      jest.spyOn(prisma.schedule, 'findMany').mockResolvedValue(result)

      expect(await service.getSchedules()).toEqual(result)
    })
  })

  describe('getScheduleForId', () => {
    it('should return a schedule for the given id', async () => {
      const result: ScheduleDTO = {
        id: 'schedule-1',
        accountId: 1,
        agentId: 1,
        startTime: new Date(),
        endTime: new Date(),
        tasks: [],
      }

      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(result)

      expect(await service.getScheduleForId('schedule-1')).toEqual(result)
    });

    it('should return null if no schedule is found', async () => {
      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(null)

      expect(await service.getScheduleForId('nonexistent')).toBeNull()
    })
  })

  describe('updateSchedule', () => {
    it('should update and return the schedule', async () => {
      const updateScheduleDto: UpdateScheduleDTO = {
        accountId: 1,
        agentId: 1,
        startTime: new Date(),
        endTime: new Date(),
      }

      const result: ScheduleDTO = {
        id: 'schedule-1',
        accountId: updateScheduleDto.accountId,
        agentId: updateScheduleDto.agentId,
        startTime: updateScheduleDto.startTime,
        endTime: updateScheduleDto.endTime,
        tasks: [],
      }

      jest.spyOn(prisma.schedule, 'update').mockResolvedValue(result)

      expect(await service.updateSchedule('schedule-1', updateScheduleDto)).toEqual(result)
    })
  })

  describe('deleteSchedule', () => {
    it('should delete and return the schedule', async () => {
      const result: ScheduleDTO = {
        id: 'schedule-1',
        accountId: 1,
        agentId: 1,
        startTime: new Date(),
        endTime: new Date(),
        tasks: [],
      }

      jest.spyOn(prisma.schedule, 'delete').mockResolvedValue(result)

      expect(await service.deleteSchedule('schedule-1')).toEqual(result)
    })
  })
})