import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/persistence/prisma/prisma.module';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { AccountModule } from './application/account/account.module';
import { AuthModule } from './infra/auth/auth.module';
import { ComponentsModule } from './infra/components/components.module';

@Module({
	imports: [
		PrismaModule,
		PersistenceModule.register({
			type: 'prisma',
			global: true,
		}),
		AccountModule,
		AuthModule,
		ComponentsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
