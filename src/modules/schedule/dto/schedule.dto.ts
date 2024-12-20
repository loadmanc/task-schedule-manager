import { TaskDTO } from "src/modules/task/dto/task.dto"

export interface ScheduleDTO {
  id: string
  accountId: number
  agentId: number
  startTime: Date
  endTime: Date
  tasks?: TaskDTO[]
}