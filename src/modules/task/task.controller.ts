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
  create(@Body() createTaskDto: CreateTaskDTO): Promise<TaskDTO> {
    return this.taskService.createTask(createTaskDto)
  }

  @Get()
  findAll(): Promise<TaskDTO[]> {
    return this.taskService.getTasks()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskDTO | null> {
    return this.taskService.getTaskForId(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<TaskDTO> {
    return this.taskService.updateTask(id, updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TaskDTO> {
    return this.taskService.deleteTask(id)
  }
}
