import { Status } from './status';

export class Task {
	_id: String;
	name: String;
	description: String;
	user_username: String;
	dueDate: Date;
	status: Status;

}

