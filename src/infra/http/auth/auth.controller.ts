import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from '@app/infra/http/dto/register.dto';
import { RegisterUseCase } from '@app/application/account/use-cases/register';
import { LoginUseCase } from '@app/application/account/use-cases/login';
import { User } from '@app/domain/user';
import { LoginDto } from '@app/infra/http/dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(RegisterUseCase) private registerUseCase: RegisterUseCase,
		@Inject(LoginUseCase) private loginUseCase: LoginUseCase,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() registerDto: RegisterDto): Promise<User> {
		return await this.registerUseCase.execute(registerDto);
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
		return await this.loginUseCase.execute(loginDto);
	}
}
