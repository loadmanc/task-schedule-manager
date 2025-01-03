// src/modules/schedule/dto/create-schedule.dto.ts

import { IsNumber, IsString, IsDate, IsEnum } from 'class-validator'
import { TaskTypeDTO } from './task.type.dto'

export class CreateTaskDTO {
  @IsNumber()
  accountId: number

  @IsNumber()
  duration: number

  @IsDate()
  startTime: Date

  @IsString()
  scheduleId: string

  @IsEnum(TaskTypeDTO)
  type: TaskTypeDTO
}
