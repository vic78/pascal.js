import { TypesIds } from './TypesIds.js';
import { BaseVariable } from './BaseVariable.js';
import { ArrayType } from '../../SyntaxAnalyzer/Tree/Types/ArrayType.js';
import { IndexRing } from '../../SyntaxAnalyzer/Tree/Arrays/IndexRing.js';
import { ErrorsCodes } from '../../Errors/ErrorsCodes.js';
import { ArrayTuple } from '../../Semantics/Constants/ArrayTuple.js';
import { RecordTuple } from '../../Semantics/Constants/RecordTuple.js';
import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase.js';

export class ArrayVariable extends BaseVariable
{
    constructor(type, scope)
    {
        super();
        this.typeId = TypesIds.ARRAY;
        this.type = type;
        this.scope = scope;
        this.items = [];

        this.leftIntegerIndex = 0;
        this.rightIntegerIndex = null;
        this.offset = null;
        this.arrayLength = null;
    }

    setValue(indexRing, type, value)
    {
        let indexExpression = indexRing.evaluatedIndexExpression;
        let index = this.scope.getIntegerValueOfIndexVariable(indexExpression) + this.offset;

        if (index < 0 || index >= this.arrayLength) {
            this.scope.addError(ErrorsCodes.indexIsOutOfRange, '', indexRing);
        } else if (typeof this.items[index] === 'undefined') {
            this.items[index] = this.scope.createVariable(this.type.typeOfElements, value);
        }
        let item = this.items[index];
        if (indexRing.indexRing === null) {
            item.value = value.value;
        } else if (indexRing.indexRing instanceof IndexRing) {
            item.setValue(indexRing.indexRing, type, value);
        }
    }

    setInitialValueByInnerIndex(index, type, initialValue)
    {
        if (index < 0 || index >= this.arrayLength) {
            this.scope.addError(ErrorsCodes.indexIsOutOfRange, '', index);
        } else if (typeof this.items[index] === 'undefined') {
            let value = initialValue instanceof ArrayTuple ||
                initialValue instanceof RecordTuple ? initialValue : initialValue.symbol.value;

            let typeOfElements = this.type.typeOfElements;
            this.items[index] = this.scope.createVariable(typeOfElements, value);
        }
    }

    setArrayTuple(arrayTuple)
    {
        let self = this;
        arrayTuple.items.forEach((elem, index) => {
            self.setInitialValueByInnerIndex(index, self.type.typeOfElements, elem);
        });
    }

    getByIndexRing(indexRing)
    {
        let indexExpression = indexRing.evaluatedIndexExpression;
        let index = this.scope.getIntegerValueOfIndexVariable(indexExpression) + this.offset;
        if (index < 0 || index >= this.arrayLength) {
            this.scope.addError(ErrorsCodes.indexIsOutOfRange, '', indexRing);
        } else {
            if (typeof this.items[index] === 'undefined') {
                 this.items[index] = this.scope.createDefaultVariable(this.type.typeOfElements);
            }
            let foundItem = this.items[index];
            return  indexRing.indexRing instanceof IndexRing ?
                    foundItem.getByIndexRing(indexRing.indexRing) :
                    foundItem;
        }
    }

    clone()
    {
        let copyArrayVariable = new ArrayVariable(this.type, this.scope);

        copyArrayVariable.rightIntegerIndex = this.rightIntegerIndex;
        copyArrayVariable.offset = this.offset;
        copyArrayVariable.arrayLength = this.arrayLength;
//        copyArrayVariable.parentArray = this.parentArray;

        this.items.forEach(
            (item, index) => { copyArrayVariable.items[index] = item.clone(); }
        );

        return copyArrayVariable;
    }
}