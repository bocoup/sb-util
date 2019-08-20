import { VariableProperties } from './abstracts';
import { getVariableMeta } from './meta-data';
import { Sprite } from './sprites';
import { PropertiesWrapper, CollectionWrapper } from './base';

/** Class representing a Scratch variable. It is a singleton VariableCollection */
export class Variable extends PropertiesWrapper<VariableProperties> {
    /**
     * @returns Sprite that this variable belongs to
     */
    public sprite(): Sprite {
        return new Sprite(getVariableMeta(this.props()).sprite);
    }
    /**
     * @returns boolean representing if this is a global variable or not
     */
    public global(): boolean {
        return this.sprite().isStage();
    }
}

/** Class representing a variable collection */
export class VariableCollection extends CollectionWrapper<VariableProperties, Variable> {
    protected static PropClass = Variable;

    /**
     * Find the variable by a given ID
     * @param id the id string of a variable
     */
    public byId(id: string): Variable {
        for (const variable of this) {
            if (variable.prop('id') === id) {
                return variable;
            }
        }
        return null;
    }
}
