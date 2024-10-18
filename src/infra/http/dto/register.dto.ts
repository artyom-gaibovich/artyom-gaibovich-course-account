import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
	@IsString()
	email: string;

	@IsString()
	password: string;

	@IsOptional()
	displayName: string;
}
