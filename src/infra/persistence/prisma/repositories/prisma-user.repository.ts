import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';
import { UserRepository } from '@app/application/account/ports/user/user.repository';
import { User } from '@app/domain/user';
import { PrismaUserMapper } from '@app/infra/persistence/prisma/mapper/prisma-user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prismaService.user.findFirst({
			where: { email: email },
		});
		if (!user) {
			return null;
		}
		return PrismaUserMapper.toDomain(user);
	}
}
