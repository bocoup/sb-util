import { CollectionWrapper } from './CollectionWrapper';
import { Variable } from './Variable';
import { VariableProperties } from './abstracts';
/** Class representing a variable collection */
export class VariableCollection extends CollectionWrapper<VariableProperties, Variable> {
    protected static WrapperClass = Variable;
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
