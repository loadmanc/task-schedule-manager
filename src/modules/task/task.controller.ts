import { Controller } from '@nestjs/common'
import { Prisma, Schedule, Task } from '@prisma/client'
import { Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

// TODO: Change inputs to add parameters


  @Post()
  create(@Body() createScheduleDto: Prisma.ScheduleCreateInput): Promise<Task> {
    return this.taskService.createTask(createScheduleDto)
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.getTasks()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.getTaskForId(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: Prisma.ScheduleUpdateInput,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id)
  }
}