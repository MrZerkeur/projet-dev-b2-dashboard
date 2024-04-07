import { Module } from '@nestjs/common';
import { UserAccessService } from './services/user-access.service';

@Module({
  providers: [UserAccessService],
  exports: [UserAccessService],
})
export class UserAccessModule {}
