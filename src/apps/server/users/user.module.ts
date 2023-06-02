import { Module } from '@nestjs/common';
import { UserRepository } from '📚libs/modules/database/repositories/user.repository';
import { UserController } from '🔥apps/server/users/user.controller';
import { UserService } from '🔥apps/server/users/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
