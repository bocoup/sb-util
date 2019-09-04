import { map, first, count, getIndex } from './generators';
import { PropertiesWrapper } from './PropertiesWrapper';
import { propsStorage } from './meta-data';
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
    /**
     * Return the length of the collection.
     */
    public count(): number {
        return count(this.props());
    }
    /**
     * Get the wrapped item from the collection at a specific index.
     * @param n index of collection to retrieve
     */
    public index(n: number): U {
        return getIndex(this, n);
    }
}
