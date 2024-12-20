// src/modules/schedule/dto/create-schedule.dto.ts

import { IsNumber, IsString, IsDate } from 'class-validator'
import { TaskTypeDTO } from './task.dto'

export class CreateTaskDTO {
  @IsNumber()
  accountId: number

  @IsNumber()
  duration: number

  @IsDate()
  startTime: Date

  @IsString()
  scheduleId: string

  Type: TaskTypeDTO
}  
