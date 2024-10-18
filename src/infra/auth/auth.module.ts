import { Module } from '@nestjs/common';
import { EnvModule, EnvService } from '@app/infra/env';
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
	imports: [
	],
})
export class AuthModule {}
