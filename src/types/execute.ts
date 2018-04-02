import { Task } from '@lib/types/task';
import { Observable } from 'rxjs';

export interface Execute {
    (task: Task): Observable<any>;
}
