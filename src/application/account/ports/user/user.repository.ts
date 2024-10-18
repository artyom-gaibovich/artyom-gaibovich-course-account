import { User } from '@app/domain/user';

export abstract class UserRepository {
	abstract findByEmail(email: string): Promise<User>;
}
