import { Controller } from '@nestjs/common'
import { Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDTO } from './dto/createtask.dto'
import { TaskDTO } from './dto/task.dto'
import { UpdateTaskDTO } from './dto/updatetask.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDTO): Promise<TaskDTO> {
    return await this.taskService.createTask(createTaskDto)
  }

  @Get()
  async findAll(): Promise<TaskDTO[]> {
    return await this.taskService.getTasks()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskDTO | null> {
    return await this.taskService.getTaskForId(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<TaskDTO> {
    return await this.taskService.updateTask(id, updateTaskDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.taskService.deleteTask(id)
  }
}
