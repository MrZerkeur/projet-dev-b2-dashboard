import { Module } from '@nestjs/common';
import { UserAccessService } from './services/user-access.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserAccessService],
  exports: [UserAccessService],
})
export class UserAccessModule {}
