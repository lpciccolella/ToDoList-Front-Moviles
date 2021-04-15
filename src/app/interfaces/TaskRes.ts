import { Task } from './Task';

export interface TaskRes {
    status: number;
    message: string;
    task: {
        task: Task,
        author: string
    };
    error?: string;
};
