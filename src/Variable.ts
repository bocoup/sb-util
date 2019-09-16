import { getVariableMeta } from './meta-data';
import { PropertiesWrapper } from './PropertiesWrapper';
import { Sprite } from './Sprite';
import { VariableProperties } from './abstracts';
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
