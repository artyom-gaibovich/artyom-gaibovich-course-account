import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { LoginUseCase } from '@app/application/account/use-cases/login';
import { RegisterUseCase } from '@app/application/account/use-cases/register';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@app/infra/auth/auth.module';
import { ComponentsModule } from '@app/infra/components/components.module';
import { EnvModule, EnvService } from '@app/infra/env';

@Module({
	imports: [
		AuthModule,
		ComponentsModule,
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (envService: EnvService) => ({
				secret: envService.get('JWT_SECRET'),
			}),
		}),
	],
	controllers: [AuthController, UserController],
	providers: [LoginUseCase, RegisterUseCase],
})
export class HttpModule {}
