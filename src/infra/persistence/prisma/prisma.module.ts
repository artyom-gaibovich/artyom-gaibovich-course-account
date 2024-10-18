import { Module } from '@nestjs/common';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';
import { UserRepository } from '@app/application/account/ports/user/user.repository';
import { PrismaUserRepository } from '@app/infra/persistence/prisma/repositories/prisma-user.repository';
import { UserManager } from '@app/application/account/ports/user/user.manager';
import { PrismaUserManager } from '@app/infra/persistence/prisma/managers/prisma-user.manager';

@Module({
	providers: [
		PrismaService,
		{
			provide: UserRepository,
			useClass: PrismaUserRepository,
		},
		{
			provide: UserManager,
			useClass: PrismaUserManager,
		},
	],
	exports: [PrismaService, UserRepository, UserManager],
})
export class PrismaModule {}
