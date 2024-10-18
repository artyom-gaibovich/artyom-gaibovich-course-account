import { Module } from '@nestjs/common';
import { HttpModule } from '@app/infra/http/http.module';

@Module({ imports: [HttpModule] })
export class AccountModule {}
