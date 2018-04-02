function _time() {
    return Date.now();
}

// We want to run this task using workers
export function generatorFactory(interval: number) {
    return function* generateTimestamp() {
        let curr_time = _time();
        let end_time = curr_time + interval;

        while (curr_time <= end_time) {
            yield curr_time;
            curr_time = _time();
        }
    }
}