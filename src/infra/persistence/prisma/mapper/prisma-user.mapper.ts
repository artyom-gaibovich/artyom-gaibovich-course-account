import { User as PrismaUser, Prisma } from '@prisma/client';
import { User } from '@app/domain/user';

export class PrismaUserMapper {
	static toPrisma(user: User): Omit<Prisma.UserUncheckedCreateInput, 'user_id'> {
		return {
			password_hash: user.passwordHash,
			email: user.email,
			role: user.role,
			display_name: user.displayName,
		};
	}

	static toDomain(entity: PrismaUser): User {
		const model = new User({
			userId: entity.user_id,
			displayName: entity.display_name,
			passwordHash: entity.password_hash,
			email: entity.email,
			role: entity.role,
		});
		return model;
	}
}
