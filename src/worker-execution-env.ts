// here we initialize the worker, it must be able to access the task via its path
// the worker should listen to events from the main process like updating tasks
// the worker has business logic that reads new tasks when they arrive
// the worker should always look for new tasks to run and notify the master
// the master process should receive the request and approve it, letting the worker to work on a task
import * as child from 'child_process';

while(true) {
    process.st
}


