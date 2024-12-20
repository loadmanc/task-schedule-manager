import { IsDate, IsOptional, IsNumber } from 'class-validator'

export class UpdateTaskDTO {
  @IsOptional()
  @IsNumber()
  accountId: number

  @IsOptional()
  @IsNumber()
  agentId: number

  @IsOptional()
  @IsDate()
  startTime: Date

  @IsOptional()
  @IsDate()
  endTime: Date

}

