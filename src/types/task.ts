import { Worker } from 'cluster';

export interface Task {
    name: string;
    path: string;
    method: string;
    register_time: number;
    execution_time?: number;
    status: 'todo' | 'progress' | 'done'
    handler: Worker
}