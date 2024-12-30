import { Controller } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { CreateScheduleDTO } from './dto/createschedule.dto'
import { UpdateScheduleDTO } from './dto/updateschedule.dto'
import { ScheduleDTO } from './dto/schedule.dto'

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDTO): Promise<ScheduleDTO> {
    return this.scheduleService.createSchedule(createScheduleDto)
  }

  @Get()
  findAll(): Promise<ScheduleDTO[]> {
    return this.scheduleService.getSchedules()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ScheduleDTO | null> {
    return this.scheduleService.getScheduleForId(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDTO,
  ): Promise<ScheduleDTO> {
    return this.scheduleService.updateSchedule(id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ScheduleDTO> {
    return this.scheduleService.deleteSchedule(id)
  }
}
