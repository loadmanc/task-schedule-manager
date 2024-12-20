import { IsDateString, IsOptional, IsNumber } from 'class-validator'
import { UpdateTaskDTO } from 'src/modules/task/dto/updatetask.dto'

export class UpdateScheduleDTO {
  @IsOptional()
  @IsNumber()
  accountId: number

  @IsOptional()
  @IsNumber()
  agentId: number

  @IsOptional()
  @IsDateString()
  startTime: string

  @IsOptional()
  @IsDateString()
  endTime: string

  @IsOptional()
  tasks?: UpdateTaskDTO[]
}

