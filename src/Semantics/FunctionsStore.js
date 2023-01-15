import { GeneralizedTypeBase } from '../SyntaxAnalyzer/Tree/Types/Generalized/GeneralizedTypeBase.js';
import { TypeAsData } from '../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js';
import { TypeBase } from '../SyntaxAnalyzer/Tree/Types/TypeBase.js';
import { FunctionType } from '../SyntaxAnalyzer/Tree/Types/FunctionType.js';
import { SubprogramType } from '../SyntaxAnalyzer/Tree/Types/SubprogramType.js';
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
        let parametersValuesTypesRefs = [];

        if (parametersValuesTypes === null) {

            // Требуется функция типа expectedType
            if (expectedType instanceof FunctionType) {

                let signature = expectedType.signature;
                expectedType = expectedType.returnType;

                parametersValuesTypes = [];
                for (let i = 0; i < signature.length; i++) {
                    for (let j = 0; j < signature[i].identifiers.length; j++) {
                        parametersValuesTypes[i + j] = signature[i].type;
                        parametersValuesTypesRefs[i+j] = signature[i].byReference;
                    }
                }
            }
        }

        let lowerCaseName = name.toLowerCase();

        let found = null;

        if (this.items.hasOwnProperty(lowerCaseName))
            found = this.items[lowerCaseName];
        else
            return ( this.parentFunctionsStore ? this.parentFunctionsStore.getFunction(name, scope, parametersValuesTypes) : null);

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

                let typesArray = [];
                let typesArrayRefs = [];
                let typeCounter = 0;
                for (let i = 0; i < signature.length; i++) {
                    for (let j = 0; j < signature[i].identifiers.length; j++) {
                        typesArray[typeCounter] = signature[i].type;
                        typesArrayRefs[typeCounter] = signature[i].byReference;
                        typeCounter++;
                    }
                }

                // Возможна фильтрация по возвращаемому типу
                // и требуется такая фильтрация
                if (returnType !== null &&
                    expectedType !== null &&
                    !expectedType instanceof SubprogramType &&
                    !scope.checkType(returnType, expectedType)) {
                    return false;
                }

                for (let i = 0; i < typesArray.length; i++) {

                    if (!scope.checkType(typesArray[i], parametersValuesTypes[i]) ||
                        typesArrayRefs.length > 0 &&
                        parametersValuesTypesRefs.length > 0 &&
                        typesArrayRefs[i] !== parametersValuesTypesRefs[i]) {
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
};