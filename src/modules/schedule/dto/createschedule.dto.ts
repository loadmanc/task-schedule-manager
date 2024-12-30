import { IsOptional, IsNumber, IsDate } from 'class-validator'
import { CreateTaskDTO } from 'src/modules/task/dto/createtask.dto'

export class CreateScheduleDTO {
  @IsNumber()
  accountId: number

  @IsNumber()
  agentId: number

  @IsDate()
  startTime: Date

  @IsDate()
  endTime: Date

  @IsOptional()
  tasks?: CreateTaskDTO[]
}
