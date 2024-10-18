import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/application/account/ports/user/user.repository';

@Injectable()
export class LoginValidator {
	constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

	async validate(email: string, password: string): Promise<{ id: number }> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new HttpException('Login or password is not correct', HttpStatus.NOT_FOUND);
		}
		const isCorrectPassword = await user.validatePassword(password);
		if (!isCorrectPassword) {
			throw new HttpException('Login or password is not correct', HttpStatus.NOT_FOUND);
		}
		return { id: user.userId };
	}
}
