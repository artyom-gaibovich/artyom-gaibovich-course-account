import { Entity } from '@app/core/entities/entity';
import { compare, genSalt, hash } from 'bcryptjs';

export interface UserProps {
	userId?: number;
	displayName: string;
	email: string;
	passwordHash: string;
	role: 'Teacher' | 'Student';
}

export class User extends Entity<UserProps> {
	private _passwordHash: string;

	constructor(props: UserProps) {
		super(props);
	}

	get displayName(): string {
		return this.props.displayName;
	}

	get userId(): number {
		return this.props.userId;
	}

	get email(): string {
		return this.props.email;
	}

	set passwordHash(value: string) {
		this._passwordHash = value;
	}

	get passwordHash(): string {
		return this._passwordHash;
	}

	get role(): 'Teacher' | 'Student' {
		return this.props.role;
	}

	public async setPassword(password: string): Promise<User> {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	public async validatePassword(password: string): Promise<boolean> {
		return compare(password, this.props.passwordHash);
	}
}
