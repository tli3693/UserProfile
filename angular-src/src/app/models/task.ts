import { Status } from './status';

export interface Task {
	_id: String,
	name: String,
	description: String,
	user_username: String,
	dueDate: Date,
	status: Status
}