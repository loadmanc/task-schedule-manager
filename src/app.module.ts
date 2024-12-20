
import { Module } from '@nestjs/common';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TasksModule } from './modules/task/task.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ScheduleModule, TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
