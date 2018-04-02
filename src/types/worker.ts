import * as child from 'child_process';

export interface Worker {
    id: number;
    process: child.ChildProcess;
    kill();
}
