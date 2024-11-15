import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DbController],
  providers: [DbService, PrismaService],
})
export class DbModule {}
