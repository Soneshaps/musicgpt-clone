import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../logger';
import { execSync } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new LoggerService().setContext('PrismaService');

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      // Connect to the database
      await this.$connect();
      this.logger.log('Database connection established');

      // Run pending migrations
      await this.runMigrations();
    } catch (error) {
      this.logger.error(
        `Failed to initialize Prisma service: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }

  private async runMigrations() {
    try {
      const schemaPath = this.findSchemaPath();
      if (!schemaPath) {
        this.logger.warn(
          'Could not find Prisma schema file, skipping migrations',
        );
        return;
      }

      await this.executeMigrations(schemaPath);
    } catch (error) {
      this.logger.warn(`Migration check failed: ${error.message}`);
    }
  }

  private findSchemaPath(): string | null {
    // In Docker, the working directory is /app (mounted from ./backend)
    // So the schema should be at /app/prisma/schema.prisma
    const schemaPath = join(process.cwd(), 'prisma', 'schema.prisma');

    if (!existsSync(schemaPath)) {
      this.logger.warn(`Schema file not found at: ${schemaPath}`);
      return null;
    }

    this.logger.log(`Found schema at: ${schemaPath}`);
    return schemaPath;
  }

  private async executeMigrations(schemaPath: string): Promise<void> {
    this.logger.log(`Found Prisma schema at: ${schemaPath}`);

    const schemaDir = join(schemaPath, '..');

    execSync(`npx prisma migrate deploy --schema="${schemaPath}"`, {
      cwd: schemaDir,
      stdio: 'pipe',
    });

    this.logger.log('Database migrations completed successfully');
  }
}
