import { map, first } from './generators';

const propsStorage = new WeakMap();

/**
 * Generic Class to use as a base for a Properties storage wrapper
 */
export class PropertiesWrapper<T> {
    public constructor(props: T) {
        propsStorage.set(this, props);
    }

    /**
     * Return the raw Properties objects
     */
    public props(): T {
        return propsStorage.get(this);
    }

    /**
     * Read a property from the stored properties object
     * @param property The name of the property key
     */
    // prop can be a string, number, object, or boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public prop(property: string): any {
        return this.props()[property];
    }
}

/**
 * Generic Collection wrapper
 */
export class CollectionWrapper<T, U> {
    // Assign to the type of the PropertiesWrapper that we create
    protected static WrapperClass: new (T) => unknown = PropertiesWrapper;

    public constructor(iterable: Iterable<T>) {
        propsStorage.set(this, iterable);
    }

    /**
     * Return the raw iterable that returns raw properties instead of wrapped properties.
     */
    public props(): Iterable<T> {
        return propsStorage.get(this);
    }

    /**
     * Iterate the collection mapping to a utility class for additional query.
     */
    public [Symbol.iterator](): Iterator<U> {
        const { WrapperClass } = this.constructor as typeof CollectionWrapper;
        return map(this.props(), (item: T): U => new WrapperClass(item) as U);
    }

    /**
     * Return first item in collection.
     */
    public first(): U {
        return first(this);
    }
}
