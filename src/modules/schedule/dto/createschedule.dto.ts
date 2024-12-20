// src/modules/schedule/dto/create-schedule.dto.ts
import { IsDateString, IsOptional, IsNumber } from 'class-validator'

export class CreateTaskDTO {
  @IsNumber()
  accountId: number

  @IsNumber()
  agentId: number

  @IsDateString()
  startTime: string

  @IsDateString()
  endTime: string

  @IsOptional()
  tasks?: CreateTaskDTO[]

}