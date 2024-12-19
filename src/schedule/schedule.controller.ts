import { Controller } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { Prisma, Schedule } from '@prisma/client'
import { Body, Get, Post, Put, Delete, Param } from '@nestjs/common'

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // TODO: Change inputs to add parameters
  @Post()
  create(@Body() createScheduleDto: Prisma.ScheduleCreateInput): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleDto)
  }

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.getSchedules()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Schedule | null> {
    return this.scheduleService.getScheduleForId(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: Prisma.ScheduleUpdateInput,
  ): Promise<Schedule> {
    return this.scheduleService.updateSchedule(id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.deleteSchedule(id)
  }
}