export function * map<T, O>(iter: Iterable<T>, predicate: (item: T) => O): Iterator<O> {
    for (const item of iter) {
        yield predicate(item);
    }
}

export function * filter<T>(iter: Iterable<T>, predicate: (item: T) => boolean): Iterator<T> {
    for (const item of iter) {
        if (predicate(item)) {
            yield item;
        }
    }
}

export function makeIterable<T>(iter: Iterable<T>, predicate: (item: Iterable<T>) => Iterator<T>): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return predicate(iter);
        }
    };
}

export function makeIterableFromDifferentTypes<T, U>(iter: Iterable<T>, predicate: (item: Iterable<T>) => Iterator<U>): Iterable<U> {
    return {
        [Symbol.iterator]() {
            return predicate(iter);
        }
    };
}

export function * chain<T>(...iterables: Iterable<T>[]): Iterator<T> {
    for (const it of iterables) {
        yield* it;
    }
}

export function first<T>(iter: Iterable<T>): T {
    for(const item of iter) {
        return item;
    }
    return null;
}
