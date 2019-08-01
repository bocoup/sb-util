export function* map<T, O>(iter: Iterable<T>, predicate: (item: T) => O): Iterator<O> {
    for (const item of iter) {
        yield predicate(item);
    }
}

export function* filter<T>(iter: Iterable<T>, predicate: (item: T) => boolean): Iterator<T> {
    for (const item of iter) {
        if (predicate(item)) {
            yield item;
        }
    }
}

export function* chain<T>(...iterables: Iterable<T>[]): Iterator<T> {
    for (const it of iterables) {
        yield* it;
    }
}

export function first<T>(iter: Iterable<T>): T {
    for (const item of iter) {
        return item;
    }
    return null;
}

export function last<T>(iter: Iterable<T>): T {
    let val: T = null;
    for (const item of iter) {
        val = item;
    }
    return val;
}

export class MemoizedIterable<T> {
    private iterator: Iterator<T>;
    private nextIndex: number;
    private complete: boolean;

    public constructor(iter: Iterator<T> | Iterable<T>) {
        // case when iter is Iterable
        if (iter[Symbol.iterator]) {
            this.iterator = iter[Symbol.iterator]();
        } else {
            this.iterator = iter as Iterator<T>;
        }
        this.nextIndex = 0;
        this.complete = false;
    }

    public get length(): number {
        while (!this.complete) {
            this.nextValue();
        }
        return this.nextIndex;
    }

    private nextValue(): T {
        const result = this.iterator.next();
        if (result.done) {
            this.complete = true;
            return null;
        }

        this[this.nextIndex++] = result.value;
        return result.value;
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;

        while (index < this.nextIndex || !this.complete) {
            // checks if there is a memoize
            while (index < this.nextIndex) {
                yield this[index++];
            }

            // this fills the next value
            if (!this.complete) {
                this.nextValue();
            }
        }
    }
}
