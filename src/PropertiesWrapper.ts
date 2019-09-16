import { propsStorage } from './meta-data';
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
