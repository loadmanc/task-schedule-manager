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
  async create(@Body() createScheduleDto: CreateScheduleDTO): Promise<ScheduleDTO> {
    return await this.scheduleService.createSchedule(createScheduleDto)
  }

  @Get()
  async findAll(): Promise<ScheduleDTO[]> {
    return await this.scheduleService.getSchedules()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScheduleDTO | null> {
    return await this.scheduleService.getScheduleForId(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDTO,
  ): Promise<ScheduleDTO> {
    return await this.scheduleService.updateSchedule(id, updateScheduleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.scheduleService.deleteSchedule(id)
  }
}
