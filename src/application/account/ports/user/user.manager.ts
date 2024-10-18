import { User } from '@app/domain/user';

export abstract class UserManager {
	abstract create(inputUser: User): Promise<User>;
}
