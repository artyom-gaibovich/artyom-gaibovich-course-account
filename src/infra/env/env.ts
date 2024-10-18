import { z } from 'zod';

export const envSchema = z.object({
	POSTGRES_PASSWORD: z.string().optional(),
	POSTGRES_DB: z.string().optional(),
	POSTGRES_USER: z.string().optional(),
	JWT_SECRET: z.string().optional(),
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3000),
});

export type Env = z.infer<typeof envSchema>;
