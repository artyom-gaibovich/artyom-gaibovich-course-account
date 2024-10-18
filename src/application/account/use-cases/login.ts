import { Inject, Injectable } from '@nestjs/common';
import { LoginValidator } from '@app/infra/components/login.validator';
import { LoginDto } from '@app/infra/http/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
	constructor(
		@Inject(JwtService) private jwtService: JwtService,
		@Inject(LoginValidator) private loginValidator: LoginValidator,
	) {}

	async execute({ email, password }: LoginDto): Promise<{ access_token: string }> {
		const id = await this.loginValidator.validate(email, password);
		return {
			access_token: await this.jwtService.signAsync(id),
		};
	}
}
