import { PrismaModule } from '@app/infra/persistence/prisma/prisma.module';
import { DynamicModule, Module } from '@nestjs/common';

interface DatabaseOptions {
	type: 'prisma';
	global?: boolean;
}

@Module({})
export class PersistenceModule {
	static async register({ global = false, type }: DatabaseOptions): Promise<DynamicModule> {
		return {
			global,
			module: PersistenceModule,
			imports: [type === 'prisma' ? PrismaModule : PrismaModule],
			exports: [type === 'prisma' ? PrismaModule : PrismaModule],
		};
	}
}
