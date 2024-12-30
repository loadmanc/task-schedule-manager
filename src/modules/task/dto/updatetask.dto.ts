import { IsDate, IsOptional, IsNumber, IsEnum, IsString } from 'class-validator'
import { TaskTypeDTO } from './task.dto'

export class UpdateTaskDTO {
  @IsOptional()
  @IsNumber()
  accountId: number

  @IsOptional()
  @IsNumber()
  duration: number

  @IsOptional()
  @IsDate()
  startTime: Date

  @IsOptional()
  @IsString()
  scheduleId: string

  @IsOptional()
  @IsEnum(TaskTypeDTO)
  type: TaskTypeDTO
}
