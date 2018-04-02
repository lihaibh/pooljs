import { ExecutionMonitor } from '@lib/types/execution-monitor';
import { Task } from '@lib/types/task';
import { TaskExecutor } from '@lib/types/task-executor';
import { Worker } from '@lib/types/worker';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { noop } from 'rxjs/util/noop';
import { isFunction } from 'util';

/**
 * This class execute tasks in separate processes.
 * it receives tasks to execute and using its pool of workers to run them.
 * Basically it manages it's list of workers using different strategies.
 * Allows the main process to receive notifications reactively.
 * The kind of tasks a worker can run:
 * generator function - every yield interpret as an emitted event to a stream in the main process.
 * regular function - the return interpret as a promised value to the main process.
 * the worker can also notify the main process about data it produces asynchronously using the worker hook.
 * 
 * @example
 * let task = {
 *  path: 'cpu-bound-task.js',
 *  method: cpuBoundTask
 * }
 * executor: Executor = executors.single(); // creator of executors
 * executor.update({}); // you can change strategy of an executor on the fly, like number of workers
 * let stream = executor.execute(task);
 * stream.subscribe(() => ...);
 * executor.state$(selectWorkers); // you can track its working state
 */
export class Executor implements TaskExecutor, ExecutionMonitor {
    private _max_workers: number;
    private _workers: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);

    // TODO: i want to synchronize all the workers when new tasks arrive
    private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    constructor() {
        this._update_workers_of_new_tasks
            .subscribe(noop);
    }

    get workers(): Worker[] {
        return this._workers.getValue();
    }

    get tasks(): Task[] {
        return this._tasks.getValue();
    }

    get tasks$(): Observable<Task> {
        return this._tasks.asObservable()
            .distinctUntilChanged(_.isEqual);
    }

    execute<T>(task: Task): Observable<T> {

        // TODO: add the function / task to the task queue
        // TODO: check current number of workers
        // TODO: if all workers are working, create new one on demand
        // TODO: add timeout to workers, so 
        // TODO: measure time for task to be completed, so if same task come in
        // we can estimate how long it would take to run it.
        if (!this._isFunctionExists(task.path, task.method)) {
            throw Error('The task you are adding to the queue must be valid');
        }

        this._schedule(task);


        throw new Error("Method not implemented.");
    }

    private _isFunctionExists(path: string, method: string) {
        let module = require(path);

        if (isFunction(module[method])) {
            return true;
        }

        return false;
    }

    /**
     * Add task to the list of tasks to schedule
     */
    private _schedule(task: Task) {
        this._tasks.next([...this.tasks, task]);
    }

    private _notify(tasks: Task[]) {

    }

    private _workerWishToWork(task: Task) {

    }

    private _updateWorkers(): Observable<any> {
        return this.tasks$
            .filter((task) => task.status === 'todo')
            .do((tasks) => this._notify(tasks));
    }

    private _worker
}