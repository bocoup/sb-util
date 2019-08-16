export function makeIterable<T, U>(iter: T, predicate: (item: T) => Iterator<U>): Iterable<U> {
    return {
        [Symbol.iterator](): Iterator<U> {
            return predicate(iter);
        },
    };
}

export function* map<T, O>(iter: Iterable<T>, predicate: (item: T) => O): Iterator<O> {
    for (const item of iter) {
        yield predicate(item);
    }
}

export function mapIterable<T, O>(iter: Iterable<T>, predicate: (item: T) => O): Iterable<O> {
    return makeIterable(null, (): Iterator<O> => map(iter, predicate));
}

export function* flatmap<T, O>(iter: Iterable<T>, predicate: (item: T) => Iterable<O>): Iterator<O> {
    for (const item of iter) {
        yield* predicate(item);
    }
}

export function flatmapIterable<T, O>(iter: Iterable<T>, predicate: (item: T) => Iterable<O>): Iterable<O> {
    return makeIterable(null, (): Iterator<O> => flatmap(iter, predicate));
}

export function* filter<T>(iter: Iterable<T>, predicate: (item: T) => boolean): Iterator<T> {
    for (const item of iter) {
        if (predicate(item)) {
            yield item;
        }
    }
}

export function filterIterable<T>(iter: Iterable<T>, predicate: (item: T) => boolean): Iterable<T> {
    return makeIterable(null, (): Iterator<T> => filter(iter, predicate));
}

export function chain<T>(...iterables: Iterable<T>[]): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T> {
            for (const it of iterables) {
                yield* it;
            }
        },
    };
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
