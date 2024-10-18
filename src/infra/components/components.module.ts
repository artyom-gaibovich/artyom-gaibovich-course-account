import { Module } from '@nestjs/common';
import { LoginValidator } from '@app/infra/components/login.validator';

@Module({
	providers: [
		{
			provide: LoginValidator,
			useClass: LoginValidator,
		},
	],
	exports: [LoginValidator],
})
export class ComponentsModule {}
