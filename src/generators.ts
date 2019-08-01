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

export function makeIterable<T, U>(
    iter: Iterable<T>,
    predicate: (item: Iterable<T>) => Iterator<U>,
): Iterable<U> {
    return {
        [Symbol.iterator](): Iterator<U> {
            return predicate(iter);
        },
    };
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
