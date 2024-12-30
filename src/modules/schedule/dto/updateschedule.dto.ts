import { IsOptional, IsNumber, IsDate } from 'class-validator'
import { UpdateTaskDTO } from 'src/modules/task/dto/updatetask.dto'

export class UpdateScheduleDTO {
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

  @IsOptional()
  tasks?: UpdateTaskDTO[]
}
