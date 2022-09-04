import { GeneralizedTypeBase } from '../SyntaxAnalyzer/Tree/Types/Generalized/GeneralizedTypeBase.js';
import { TypeAsData } from '../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js';
import { TypeBase } from '../SyntaxAnalyzer/Tree/Types/TypeBase.js';
import { FunctionType } from '../SyntaxAnalyzer/Tree/Types/FunctionType.js';
import { UnboundedParametersList } from './Signatures/UnboundedParametersList.js';
//import { Scope } from './Scope.js';

export class FunctionsStore
{
    /**
     * @param {FunctionsStore|null} [parentFunctionsStore=null]
     */
    constructor(parentFunctionsStore = null)
    {
        this.parentFunctionsStore = parentFunctionsStore;
        this.items = {};
    }

    addFunction(name, procedure)
    {
        let lcName = name.toLowerCase();
        if (this.items.hasOwnProperty(lcName)) {
            if (Array.isArray(this.items[lcName]))
                this.items[lcName].push(procedure);
            else {
                let found = this.items[lcName];
                this.items[lcName] = [
                    found,
                    procedure
                ];
            }
        } else
            this.items[lcName] = procedure;
    }

    /**
     * @param {string} [name]
     * @param {Scope} [scope]
     * @param {array|null} [parametersValuesTypes]
     * @param {TypeBase|null} [expectedType]
     */
    getFunction(name, scope, parametersValuesTypes = null, expectedType = null)
    {
        if (parametersValuesTypes === null) {

            // Требуется функция типа expectedType
            if (expectedType instanceof FunctionType) {

                parametersValuesTypes = expectedType.signature;
                expectedType = expectedType.returnType;
            }
//            if
        }

//        console.log(name);
//        console.log(parametersValuesTypes);
//        console.log(expectedType);
//        console.log(this.items);
        let lowerCaseName = name.toLowerCase();

        let found = null;

        if (this.items.hasOwnProperty(lowerCaseName))
            found = this.items[lowerCaseName];
        else
            return ( this.parentFunctionsStore ? this.parentFunctionsStore.getFunction(name, scope, parametersValuesTypes) : null);

//        console.log(found);

        /**
         *  Если parametersValuesTypes === null, то сигнатура не будет проверяться.
         */
        if (found &&
            !Array.isArray(found) &&
            !(found.type.signature instanceof UnboundedParametersList) &&
            parametersValuesTypes !== null
        ) {
            found = [found];
        }

        if (Array.isArray(found)) {
            let filtered = found.filter((func) => {
                let signature = func.type.signature;
                let returnType = func.type.returnType;
                let identsSeqLen = signature.map( elem => elem.identifiers.length);
                let parametersNumber = identsSeqLen.reduce((partialSum, n) => partialSum + n, 0);

                let inputTypesNumber = parametersValuesTypes === null ? 0 : parametersValuesTypes.length;

                if (parametersNumber !== inputTypesNumber)
                    return false;
//                else if (signature.length === 0)
//                    return true;

                let typesArray = [];
                for (let i = 0; i < signature.length; i++) {
                    for (let j = 0; j < signature[i].identifiers.length; j++) {
                        typesArray[i + j] = signature[i].type;
                    }
                }

                // Возможна фильтрация по возвращаемому типу
                // и требуется такая фильтрация
                if (returnType !== null &&
                    expectedType !== null &&
                    !this.checkType(returnType, expectedType, scope)) {
                    return false;
                }

                for (let i = 0; i < typesArray.length; i++) {

                    if (!this.checkType(typesArray[i], parametersValuesTypes[i], scope)) {
                        return false;
                    }
                }
                return true;
            });
            return filtered.length > 0 ? filtered[0] :
                (this.parentFunctionStore ? this.parentFunctionsStore.getFunction(name, scope, parametersValuesTypes) : null);
        } else {
            return found;
        }
    }

    checkType(outerType, innerType, scope)
    {
        if ( outerType instanceof GeneralizedTypeBase &&
            !scope.typeIncluded(outerType, innerType)) {
            return false;
        } else if(outerType instanceof TypeBase &&
            !scope.sameType(outerType, innerType)) {
            return false;
        } else if (outerType instanceof TypeAsData &&
            !scope.typeIncluded(outerType.type, innerType)) {
            return false;
        }

        return true;
    }
};