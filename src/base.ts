import { map, first } from './generators';

const propsStorage = new WeakMap();

/**
 * Generic Class to use as a base for a Properties storage wrapper
 */
export class PropertiesWrapper<T> {
    public constructor(props: T) {
        propsStorage.set(this, props);
    }

    public props(): T {
        return propsStorage.get(this);
    }

    // prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        return this.props()[property];
    }
}

export class CollectionWrapper<T, U> {
    protected static PropClass: new (T) => unknown = PropertiesWrapper;

    public constructor(props: Iterable<T>) {
        propsStorage.set(this, props);
    }

    public propsIterable(): Iterable<T> {
        return propsStorage.get(this);
    }

    public [Symbol.iterator](): Iterator<U> {
        const PropClass = (this.constructor as typeof CollectionWrapper).PropClass;
        return map(this.propsIterable(), (item: T): U => new PropClass(item) as U);
    }

    public first(): U {
        return first(this);
    }
}
