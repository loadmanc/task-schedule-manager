
import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { TasksModule } from './task/task.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ScheduleModule, TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
