import { Executor } from './executor';

export class ExecutorFactory {
    single(): Executor {
        return null;
    }
    fixed(num_of_workers: number): Executor {
        return null;
    }
}