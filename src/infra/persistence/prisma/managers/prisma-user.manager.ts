import { Inject, Injectable } from '@nestjs/common';
import { UserManager } from '@app/application/account/ports/user/user.manager';
import { User } from '@app/domain/user';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';
import { PrismaUserMapper } from '@app/infra/persistence/prisma/mapper/prisma-user.mapper';

@Injectable()
export class PrismaUserManager implements UserManager {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

	async create(inputUser: User): Promise<User> {
		const data = PrismaUserMapper.toPrisma(inputUser);
		const createdUser = await this.prismaService.user.create({ data });
		return PrismaUserMapper.toDomain(createdUser);
	}
}
