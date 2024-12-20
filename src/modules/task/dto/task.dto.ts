export enum TaskTypeDTO {
  BREAK = "BREAK",
  WORK = "WORK"
}
  
export interface TaskDTO {
  id: string
  accountId: number
  type: TaskTypeDTO
  startTime: Date
  duration: number
  scheduleId: string
  schedule: ScheduleDTO
}
