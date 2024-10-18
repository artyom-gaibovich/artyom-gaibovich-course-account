import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserManager } from '@app/application/account/ports/user/user.manager';
import { UserRepository } from '@app/application/account/ports/user/user.repository';
import { RegisterDto } from '@app/infra/http/dto/register.dto';
import { User } from '@app/domain/user';
import { Role } from '@prisma/client';

@Injectable()
export class RegisterUseCase {
	constructor(
		@Inject(UserManager) private userManager: UserManager,
		@Inject(UserRepository) private userRepository: UserRepository,
	) {}

	async execute({ email, password, displayName }: RegisterDto): Promise<User> {
		const oldUser = await this.userRepository.findByEmail(email);
		if (oldUser) {
			throw new HttpException('User already exists', HttpStatus.CONFLICT);
		}
		const userEntity = await new User({
			email,
			displayName,
			passwordHash: '',
			role: Role.Student,
		}).setPassword(password);

		const newUser = await this.userManager.create(userEntity);
		return newUser;
	}
}
