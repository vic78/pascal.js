import { Scope } from './Scope.js';
import { FunctionItem } from './FunctionItem.js';
import { ProcedureItem } from './ProcedureItem.js';
import { ScalarVariable } from './Variables/ScalarVariable.js';
import { EnumVariable } from './Variables/EnumVariable.js';
import { CallableVariable } from './Variables/CallableVariable.js';
import { TypesIds } from './Variables/TypesIds.js';
import { VariablesDeclaration } from '../SyntaxAnalyzer/Tree/VariablesDeclaration.js';
import { TypeDeclaration } from '../SyntaxAnalyzer/Tree/TypeDeclaration.js';
import { ConstantDeclaration } from '../SyntaxAnalyzer/Tree/ConstantDeclaration.js';
import { ScalarType } from '../SyntaxAnalyzer/Tree/Types/ScalarType.js';
import { GeneralizedTypeBase } from '../SyntaxAnalyzer/Tree/Types/Generalized/GeneralizedTypeBase.js';
import { TypeAsData } from '../SyntaxAnalyzer/Tree/Types/Generalized/TypeAsData.js';
import { ArrayType } from '../SyntaxAnalyzer/Tree/Types/ArrayType.js';
import { StringType } from '../SyntaxAnalyzer/Tree/Types/Scalar/StringType.js';
import { IntegerType } from '../SyntaxAnalyzer/Tree/Types/Scalar/IntegerType.js';
import { CharType } from '../SyntaxAnalyzer/Tree/Types/Scalar/CharType.js';
import { FunctionType } from '../SyntaxAnalyzer/Tree/Types/FunctionType.js';
import { ProcedureType } from '../SyntaxAnalyzer/Tree/Types/ProcedureType.js';
import { Identifier } from '../SyntaxAnalyzer/Tree/Identifier.js';
import { Function } from '../SyntaxAnalyzer/Tree/Function.js';
import { Procedure } from '../SyntaxAnalyzer/Tree/Procedure.js';
import { Assignation } from '../SyntaxAnalyzer/Tree/Assignation.js';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes.js';
import { Constant } from '../SyntaxAnalyzer/Tree/Constant.js';
import { ArrayTuple } from '../Semantics/Constants/ArrayTuple.js';
import { RecordTuple } from '../Semantics/Constants/RecordTuple.js';
import { NmbFloat } from '../LexicalAnalyzer/Symbols/NmbFloat.js';
import { NmbInt } from '../LexicalAnalyzer/Symbols/NmbInt.js';
import { OneSymbol } from '../LexicalAnalyzer/Symbols/OneSymbol.js';
import { StringConstant } from '../LexicalAnalyzer/Symbols/StringConstant.js';
import { Addition } from '../SyntaxAnalyzer/Tree/Addition.js';
import { Subtraction } from '../SyntaxAnalyzer/Tree/Subtraction.js';
import { Multiplication } from '../SyntaxAnalyzer/Tree/Multiplication.js';
import { Division } from '../SyntaxAnalyzer/Tree/Division.js';
import { IntegerDivision } from '../SyntaxAnalyzer/Tree/IntegerDivision.js';
import { Modulo } from '../SyntaxAnalyzer/Tree/Modulo.js';
import { LogicalAnd } from '../SyntaxAnalyzer/Tree/LogicalAnd.js';
import { LogicalOr } from '../SyntaxAnalyzer/Tree/LogicalOr.js';
import { UnaryMinus } from '../SyntaxAnalyzer/Tree/UnaryMinus.js';
import { Not } from '../SyntaxAnalyzer/Tree/Not.js';
import { CompoundOperator } from '../SyntaxAnalyzer/Tree/CompoundOperator.js';
import { Implication } from '../SyntaxAnalyzer/Tree/Implication.js';
import { TakeField } from '../SyntaxAnalyzer/Tree/TakeField.js';
import { WhileCycle } from '../SyntaxAnalyzer/Tree/Loops/WhileCycle.js';
import { RepeatCycle } from '../SyntaxAnalyzer/Tree/Loops/RepeatCycle.js';
import { ForCycle } from '../SyntaxAnalyzer/Tree/Loops/ForCycle.js';
import { ProcedureCall } from '../SyntaxAnalyzer/Tree/ProcedureCall.js';
import { FunctionCall } from '../SyntaxAnalyzer/Tree/FunctionCall.js';
import { In } from '../SyntaxAnalyzer/Tree/Relations/In.js';
import { Equal } from '../SyntaxAnalyzer/Tree/Relations/Equal.js';
import { NotEqual } from '../SyntaxAnalyzer/Tree/Relations/NotEqual.js';
import { Less } from '../SyntaxAnalyzer/Tree/Relations/Less.js';
import { Greater } from '../SyntaxAnalyzer/Tree/Relations/Greater.js';
import { GreaterOrEqual } from '../SyntaxAnalyzer/Tree/Relations/GreaterOrEqual.js';
import { LessOrEqual } from '../SyntaxAnalyzer/Tree/Relations/LessOrEqual.js';
import { FunctionsStore } from './FunctionsStore.js';
import { MainFunctionsStore } from './MainFunctionsStore.js';
import { RuntimeError } from '../Errors/RuntimeError.js';
import { ErrorsDescription } from '../Errors/ErrorsDescription.js';
import { ErrorsCodes } from '../Errors/ErrorsCodes.js';
import { Break } from  '../SyntaxAnalyzer/Tree/Break.js';
import { IndexedIdentifier } from '../SyntaxAnalyzer/Tree/Arrays/IndexedIdentifier.js';
import { IndexRing } from '../SyntaxAnalyzer/Tree/Arrays/IndexRing.js';
import { UnboundedParametersList } from '../Semantics/Signatures/UnboundedParametersList.js';
import { ArrayVariable } from '../Semantics/Variables/ArrayVariable.js';
import { GetByPointer } from '../SyntaxAnalyzer/Tree/GetByPointer.js';
import { GetPointer } from '../SyntaxAnalyzer/Tree/GetPointer.js';
import { PointerVariable } from './Variables/PointerVariable.js';
import { Switch } from '../SyntaxAnalyzer/Tree/Case/Switch.js';
import { Case } from '../SyntaxAnalyzer/Tree/Case/Case.js';

export class Engine
{
    constructor(tree, config)
    {
        this.tree = tree;
        this.trees = [this.tree];
        this.treesCounter = 0;
        this.scopes = [];
        this.currentScopeId = 0;
        this.scopes[this.currentScopeId] = new Scope();
        this.functionsStore = new MainFunctionsStore(config.input, config.outputStream, config.ouputNewLineSymbol);
        this.errorsDescription = new ErrorsDescription();
    }
    /**
     * @return Scope
     */
    getCurrentScope()
    {
        return this.scopes[this.currentScopeId];
    }

    async run()
    {
        this.setConstants();
        this.setTypes();
        this.setVariables();

        let self = this;

        if (this.tree.sentences) {
            for (let i = 0; i < this.tree.sentences.length; i++) {
                await this.evaluateSentence(this.tree.sentences[i]);
            }
        }
    }

    setVariables()
    {
        let currentScope = this.getCurrentScope();

        if (this.tree.vars) {
            this.tree.vars.forEach(function (variablesDeclaration) {
                if (variablesDeclaration instanceof VariablesDeclaration) {

                    let variablesType = variablesDeclaration.variablesType;

                    variablesDeclaration.identifiers.forEach(
                        function(identifier)
                        {
                            if (identifier instanceof Identifier) {
                                currentScope.addVariable(identifier, variablesDeclaration.variablesType, null, identifier);
                                let initialValue = variablesDeclaration.initialValue;
                                if (initialValue instanceof Constant) {
                                    currentScope.setValue(identifier, initialValue.type, initialValue.symbol.value, initialValue);
                                } else if (initialValue instanceof ArrayTuple ||
                                    initialValue instanceof RecordTuple) {
                                    currentScope.setValue(identifier, initialValue.type, initialValue, initialValue);
                                }
                            } else {
                                throw 'Identifier must be here!';
                            }
                        }
                    );
                } else {
                    throw 'VariablesDeclaration object must be here!';
                }
            });
        }
    }

    setTypes()
    {
        let currentScope = this.getCurrentScope();

        if (this.tree.types) {
            this.tree.types.forEach(function (typeDeclaration) {
                if (typeDeclaration instanceof TypeDeclaration) {

                    currentScope.addType(typeDeclaration);

                } else {
                    throw 'TypeDeclaration object must be here!';
                }
            });
        }
    }

    setConstants()
    {
        let currentScope = this.getCurrentScope();

        if (this.tree.constants) {
            this.tree.constants.forEach(function (constantDeclaration) {
                if (constantDeclaration instanceof ConstantDeclaration) {

                    currentScope.addConstant(constantDeclaration);

                } else {
                    throw 'ConstantDeclaration object must be here!';
                }
            });
        }
    }

    async evaluateIndexRing(indexRing)
    {
        indexRing.evaluatedIndexExpression = await this.evaluateExpression(indexRing.indexExpression);
        if (indexRing.indexRing instanceof IndexRing) {
            await this.evaluateIndexRing(indexRing.indexRing);
        }

        return indexRing;
    }

    /**
     * Вызвать функцию или процедуру без скобок и параметров.
     */
    async evaluateIdentifierBranchRunner(identifierBranchExpression, parametersTypes = null, expectedType = null)
    {
        let expressionResult = await this.evaluateIdentifierBranch(identifierBranchExpression, parametersTypes, expectedType);

        while (expressionResult instanceof CallableVariable) {
            let currentScope = this.getCurrentScope();
            let func = expressionResult.value;
            let funcType = func.type;
            let funcReturnType = funcType.returnType;

            if (
                Array.isArray(funcType.signature) &&
                funcType.signature.length === 0 &&
                    expectedType === null ||
                    funcType.signature instanceof UnboundedParametersList ||
                    !currentScope.checkType(expectedType, funcType) &&
                    (
                        funcType instanceof ProcedureType ||
                        currentScope.checkType(expectedType, funcReturnType)
                    )
            ) {
                let scope = new Scope(currentScope);
                let procedureName = null;

                if (func instanceof Function) {
                    let procedureIdentifier = func.name;
                    procedureName = procedureIdentifier.symbol.value.toLowerCase();
                    scope.addVariable(procedureIdentifier, func.type.returnType, null, null, true);
                    scope.callableName = func.name.symbol.value;
                } else if (func instanceof FunctionItem) {
                    let name = func.name;
                    procedureName = name;
                }

                this.treesCounter++;

                this.tree = func;
                this.trees[this.treesCounter] = this.tree;
                this.currentScopeId++;
                this.scopes[this.currentScopeId] = scope;

                await this.run();

                if (typeof func.innerRun === 'function' ) {
                    await func.innerRun(scope, this);
                }

                let result = null;
                if (func instanceof FunctionItem ||
                        func instanceof Function) {
                    result = scope.getVariable(procedureName);
                }

                delete this.scopes[this.currentScopeId];

                this.currentScopeId--;
                this.treesCounter--;
                this.tree = this.trees[this.treesCounter];

                expressionResult = result;
            } else {
                break;
            }

        }

        return expressionResult;
    }

    async evaluateIdentifierBranch(identifierBranchExpression, parametersTypes = null, expectedType = null)
    {
        if (identifierBranchExpression instanceof Identifier) {
            let currentScope = this.getCurrentScope();
            let name = identifierBranchExpression.symbol.value;
            let result = currentScope.getElementByIdentifier(identifierBranchExpression);

            if (result !== null) {
                return result;
            }
            let lowerCaseName = name.toLowerCase();

            let declaredFunction = this.tree.functionsStore.getFunction(lowerCaseName, currentScope, parametersTypes, expectedType);
            let calledFunction = declaredFunction ?
                declaredFunction :
                this.functionsStore.getFunction(lowerCaseName, currentScope, parametersTypes, expectedType);
            if (calledFunction !== null) {
                return  new CallableVariable(Array.isArray(calledFunction) ? new FunctionType(null) : calledFunction.type, calledFunction);
            }
            this.addError(ErrorsCodes.variableNotDeclared, `Element '${name}' not declared.`, identifierBranchExpression);
        } else if (identifierBranchExpression instanceof IndexedIdentifier) {
            let currentScope = this.getCurrentScope();

            let indexedVariable = await this.evaluateIdentifierBranch(identifierBranchExpression.identifier, parametersTypes);
            let variableType = indexedVariable.type;

            await this.evaluateIndexRing(identifierBranchExpression.indexRing);

            let ring = identifierBranchExpression.indexRing;

            if (variableType instanceof ArrayType) {
                return indexedVariable.getByIndexRing(ring);
            } else if (variableType instanceof StringType) {

                if (ring.indexRing !== null) {
                    this.addError(ErrorsCodes.typesMismatch, ` Illegal qualifier. Cannot apply more than one indices to String.`, identifierBranchExpression);
                }

                let indexType = ring.evaluatedIndexExpression.type;
                if (!(indexType instanceof IntegerType) && indexType.typeId !== TypesIds.INTEGER) {
                    this.addError(ErrorsCodes.typesMismatch, `Integer index expected but ${indexType} found.`, ring.indexExpression);
                }

                let indexValue = ring.evaluatedIndexExpression.value;
                let indexedString = indexedVariable.value;
                let stringLength  = typeof indexedString === 'string' ? indexedString.length : 0;

                let resultCharacter =
                    indexValue !== 0 &&
                    indexValue >= 1 &&
                    indexValue <= stringLength ? indexedString[indexValue - 1] : String.fromCharCode(0);

                return currentScope.createVariable(new CharType, resultCharacter);

            } else {
                this.addError(ErrorsCodes.typesMismatch, `Array or String expected but ${indexedVariable.type} found.`, identifierBranchExpression);
            }

        } else if (identifierBranchExpression instanceof FunctionCall) {

            let parameters = identifierBranchExpression.parameters;
            let evaluatedParameters = await Promise.all(
                parameters.map(async (elem) => await this.evaluateExpression(elem))
            );

            let evaluatedParametersTypes = [];
            if (Array.isArray(evaluatedParameters)) {
                evaluatedParametersTypes = evaluatedParameters.map((elem) => elem.type);
            }
            let returnedElem = await this.evaluateIdentifierBranch(identifierBranchExpression.identifierBranch, evaluatedParametersTypes);
            let calledElem = returnedElem instanceof CallableVariable ?
                        returnedElem.value :
                        returnedElem;

            let currentScope = this.getCurrentScope();
            let scope = new Scope(currentScope);
            let procedureName = null;

            if (calledElem instanceof Function) {
                let procedureIdentifier = calledElem.name;
                procedureName = procedureIdentifier.symbol.value.toLowerCase();
                scope.addVariable(procedureIdentifier, calledElem.type.returnType, null, null, true);
                scope.callableName = calledElem.name.symbol.value;
            } else if (calledElem instanceof FunctionItem) {
                let name = calledElem.name;
                procedureName = name;
            }

            await this.addParametersToScope(identifierBranchExpression.parameters, evaluatedParameters, calledElem.type.signature, scope);
            this.treesCounter++;

            this.tree = calledElem;
            this.trees[this.treesCounter] = this.tree;
            this.currentScopeId++;
            this.scopes[this.currentScopeId] = scope;

            await this.run();

            if (typeof calledElem.innerRun === 'function' ) {
                await calledElem.innerRun(scope, this);
            }

            let result = null;
            if (calledElem instanceof FunctionItem ||
                    calledElem instanceof Function) {
                result = scope.getVariable(procedureName);
            }

            delete this.scopes[this.currentScopeId];

            this.currentScopeId--;
            this.treesCounter--;
            this.tree = this.trees[this.treesCounter];
            return result;
        } else if (identifierBranchExpression instanceof GetByPointer) {
            let pointerVariable = await this.evaluateIdentifierBranch(identifierBranchExpression.pointer, parametersTypes);
            return pointerVariable.variable;
        } else if (identifierBranchExpression instanceof TakeField) {
            let baseExpression = await this.evaluateIdentifierBranch(identifierBranchExpression.baseExpression, parametersTypes);
            let propertyIdentifier = identifierBranchExpression.subField;
            return baseExpression.getByPropertyIdentifier(propertyIdentifier);
        } else {
            this.addError(ErrorsCodes.typesMismatch, 'Identifier branch expected.', identifierBranchExpression);
        }
    }

    async evaluateSentence(sentence)
    {
        let currentScope = this.getCurrentScope();

        if (sentence instanceof Assignation) {
            let destination = sentence.destination;
            let destinationResult = await this.evaluateIdentifierBranch(destination);
            let expectedType = destinationResult.type;
            let sourceExpression = sentence.sourceExpression;
            let expressionResult = await this.evaluateExpression(sourceExpression, expectedType);
            let type = expressionResult.getType();
            let operationSymbolCode = sentence.symbol.symbolCode;
            switch (operationSymbolCode) {
                case SymbolsCodes.plusAssign:
                case SymbolsCodes.minusAssign:
                case SymbolsCodes.slashAssign:
                case SymbolsCodes.starAssign:
                    let destinationType = destinationResult.getType();
                    let destinationTypeId = destinationType.typeId;
                    let sourceTypeId = type.typeId;
                    switch (sourceTypeId) {
                        case TypesIds.REAL:
                        case TypesIds.INTEGER:
                        break;
                        default:
                            this.addError(ErrorsCodes.typesMismatch, 'Non-numeric source for assign operator', sentence);
                    }
                    switch (destinationType.typeId) {
                        case TypesIds.REAL:
                            break;
                        case TypesIds.INTEGER:
                            if (sourceTypeId.typeId === TypesIds.REAL ||
                                operationSymbolCode === SymbolsCodes.slashAssign) {
                                this.addError(ErrorsCodes.typesMismatch, 'Cannot assign floating point value to an integer variable', sentence);
                            }
                            break;
                        default:
                            this.addError(ErrorsCodes.typesMismatch, 'Non-numeric destination for assign operator', sentence);
                    }

                    let result = null;
                    switch (operationSymbolCode) {
                        case SymbolsCodes.plusAssign:
                            result = destinationResult.value + expressionResult.value;
                            break;
                        case SymbolsCodes.minusAssign:
                            result = destinationResult.value - expressionResult.value;
                            break;
                        case SymbolsCodes.slashAssign:
                            result = destinationResult.value / expressionResult.value;
                            break;
                        case SymbolsCodes.starAssign:
                            result = destinationResult.value * expressionResult.value;
                    }

                    expressionResult = new ScalarVariable(result, destinationTypeId);
                    break;
                default:
                case SymbolsCodes.assign:
            }

            if (destination instanceof TakeField) {
                let recordVariable = await this.evaluateIdentifierBranch(destination.baseExpression);
                let propertyIdentifier = destination.subField;

                currentScope.setRecordVariableProperty(recordVariable, propertyIdentifier, expressionResult);

            } else {
                let indexedVariable = null;
                let variableType = null;
                if (destination instanceof IndexedIdentifier) {
                    await this.evaluateIndexRing(destination.indexRing);

                    indexedVariable = await this.evaluateIdentifierBranch(destination.identifier);
                    variableType = indexedVariable.type;
                }
                // Установка одного символа строки по индексу
                if (destination instanceof IndexedIdentifier &&
                    variableType instanceof StringType) {
                    let ring = destination.indexRing;

                    if (ring.indexRing !== null) {
                        this.addError(ErrorsCodes.typesMismatch, ` Illegal qualifier. Cannot apply more than one indices to String.`, identifierBranchExpression);
                    }

                    let indexType = ring.evaluatedIndexExpression.type;
                    if (!(indexType instanceof IntegerType) && indexType.typeId !== TypesIds.INTEGER) {
                        this.addError(ErrorsCodes.typesMismatch, `Integer index expected but ${indexType} found.`, ring.indexExpression);
                    }

                    let resultType = expressionResult.type;
                    let resultValue = expressionResult.value;

                    if (!(resultType instanceof StringType) &&
                        !(resultType instanceof CharType) ||
                        !(typeof resultValue === 'string') ||
                        resultValue.length !== 1) {

                        this.addError(ErrorsCodes.typesMismatch, `A Char expected but '${resultValue}' found.`, sourceExpression);
                    }

                    let indexValue = ring.evaluatedIndexExpression.value;
                    let indexedString = indexedVariable.value;
                    let stringLength  = typeof indexedString === 'string' ? indexedString.length : 0;

                    if (indexValue > 0 && indexValue <= stringLength) {
                        indexedVariable.value = indexedString.substring(0, indexValue-1) + resultValue + indexedString.substring(indexValue);
                    }
                } else {
                    currentScope.setVariableValue(destination, expressionResult, sentence.destination);
                }
            }
        } else if (sentence instanceof CompoundOperator) {
            if (sentence.sentences) {
                let sentences = sentence.sentences;
                let sentencesNumber = sentences.length;
                for (let i = 0; i < sentencesNumber; i++) {
                    let result = await this.evaluateSentence(sentences[i]);
                    if (result instanceof Break) {
                        return result;
                    }
                }
            }
        } else if (sentence instanceof Implication) {
            let condition = await this.evaluateExpression(sentence.condition);

            if (condition.value === true) {
                return await this.evaluateSentence(sentence.left);
            } else {
                return await this.evaluateSentence(sentence.right);
            }
        } else if ( sentence instanceof FunctionCall ||
                    sentence instanceof ProcedureCall) {
            return await this.evaluateIdentifierBranch(sentence);
        } else if (sentence instanceof WhileCycle) {
            let currentScope = this.getCurrentScope();
            currentScope.cycleDepth++;
            while ( ( await this.evaluateExpression(sentence.condition) ).value === true) {
                let result = await this.evaluateSentence(sentence.body);
                if (result instanceof Break) {
                    break;
                }
            }
            currentScope.cycleDepth--;
        } else if (sentence instanceof RepeatCycle) {
            let currentScope = this.getCurrentScope();
            currentScope.cycleDepth++;
            do {
                let result = await this.evaluateSentence(sentence.body);
                if (result instanceof Break) {
                    break;
                }
            } while ( ( await this.evaluateExpression(sentence.condition) ).value !== true )
            currentScope.cycleDepth--;
        } else if (sentence instanceof ForCycle) {
            let currentScope = this.getCurrentScope();
            let variableIdentifier = sentence.variableIdentifier;
            let initalValueVariable = await this.evaluateExpression(sentence.initExpression);
            let currentValue = currentScope.createVariable(initalValueVariable.type, initalValueVariable.value);
            let lastValue = await this.evaluateExpression(sentence.lastExpression);

            let increment = null;
            let comparation = null;
            let typeId = currentValue.typeId;
            let type = currentValue.type;
            currentScope.setValue(variableIdentifier, type, currentValue.value, variableIdentifier);
            if (sentence.countDown) {
                switch (typeId) {
                    case TypesIds.INTEGER:
                        increment = function(elem) {
                            elem.value--;
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.value >= rightElem.value;
                        break;
                    case TypesIds.CHAR:
                        increment = function(elem) {
                            let code = elem.value.charCodeAt(0);
                            code--;
                            elem.value = String.fromCharCode(code);
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.value.charCodeAt(0) >= rightElem.value.charCodeAt(0);
                        break;
                    case TypesIds.ENUM:
                        increment = function(elem) {
                            let items = elem.type.items;
                            let len = items.length;
                            let index = elem.getIndex();
                            index--;
                            elem.value = items[(index + len) % len];
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.getIndex() >= rightElem.getIndex();
                        break;
                }
            } else {
                switch (typeId) {
                    case TypesIds.INTEGER:
                        increment = function(elem) {
                            elem.value++;
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.value <= rightElem.value;
                        break;
                    case TypesIds.CHAR:
                        increment = function(elem) {
                            let code = elem.value.charCodeAt(0);
                            code++;
                            elem.value = String.fromCharCode(code);
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.value.charCodeAt(0) <= rightElem.value.charCodeAt(0);
                        break;
                    case TypesIds.ENUM:
                        increment = function(elem) {
                            let items = elem.type.items;
                            let len = items.length;
                            let index = elem.getIndex();
                            index++;
                            elem.value = items[index % len];
                            return elem;
                        };
                        comparation = (leftElem, rightElem) => leftElem.getIndex() <= rightElem.getIndex();
                        break;
                }
            }
            currentScope.cycleDepth++;
            let previousVal = typeId === TypesIds.ENUM ?
                new EnumVariable(currentValue.value, type) :
                new ScalarVariable(currentValue.value, type);
            let canContinue = true;
            while (comparation(currentValue, lastValue) && canContinue) {
                let result = await this.evaluateSentence(sentence.body);
                if (result instanceof Break) {
                    break;
                }
                previousVal.value = currentValue.value;
                currentValue = increment(currentValue);
                currentScope.setValue(variableIdentifier, type, currentValue.value);
                canContinue = comparation(previousVal, currentValue);
            }
            currentScope.cycleDepth--;
        } else if (sentence instanceof Break) {
            let currentScope = this.getCurrentScope();
            if (currentScope.cycleDepth <= 0) {
                this.addError(ErrorsCodes.breakOutOfLoop, null, sentence);
            } else {
                return sentence;
            }
        } else if (sentence instanceof Switch) {
            let switchValue = await this.evaluateExpression(sentence.switchExpression);
            let caseFound = false;
            let currentScope = this.getCurrentScope();

            for (let i = 0; i <  sentence.cases.length; i++) {
                let caseItem = sentence.cases[i];
                for(let j = 0; j < caseItem.constants.length; j++) {
                    let constant = caseItem.constants[j];
                    if (constant.typeId !== switchValue.type.typeId) {
                        this.addError(ErrorsCodes.typesMismatch, 'The constant and the switch expression have different types', constant);
                    }
                    if (constant.symbol.value === switchValue.value) {
                        caseFound = true;
                        this.evaluateSentence(caseItem.operator);
                        break;
                    }
                }
                if (caseFound) {
                    break;
                }
            }

            if (!caseFound && sentence.elseSentence !== null) {
                this.evaluateSentence(sentence.elseSentence);
            }
        } else if (sentence instanceof Identifier) {
            await this.evaluateIdentifierBranchRunner(sentence);
        }
    }

    async addParametersToScope(parameters, evaluatedParameters, signature, scope)
    {
        if (signature instanceof UnboundedParametersList) {
            if (signature.byReference) {
                scope.setParametersList(parameters);
            } else {
                scope.setParametersList(evaluatedParameters);
            }
        } else {
            let parametersCounter = 0;

            for (let j = 0; j < signature.length; j++) {
                let appliedType = signature[j];
                let identifiers = appliedType.identifiers;
                let byReference = appliedType.byReference;

                for (let j = 0; j < identifiers.length; j++) {
                    let identifier = identifiers[j];
                    let type = appliedType.type;
                    let parameter = parameters[parametersCounter];
                    if (byReference) {
                        if (!(parameter instanceof Identifier)) {
                            this.addError(ErrorsCodes.identifierExpected, 'Cannot use other expressions here', parameter);
                        }
                        scope.addVariableByReference(parameter, identifier);
                    } else {
                        let result = evaluatedParameters[parametersCounter];
                        if (type instanceof GeneralizedTypeBase) {
                            type = result.type;
                        }
                        scope.addVariable(identifier, type);
                        scope.setValue(identifier, type, result, identifier);
                    }
                    parametersCounter++;
                }
            }
        }
    }

    async evaluateExpression(expression, expectedType = null)
    {
        if (expression instanceof GetPointer) {
            let indentifierBranch = expression.identifier;
            let identifierBranchResult = await this.evaluateIdentifierBranch(indentifierBranch);
            let type = identifierBranchResult.getType();
            return new PointerVariable(identifierBranchResult, type);
        } else if (expression instanceof Equal) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.ENUM &&
                rightOperand.typeId === TypesIds.ENUM &&
                Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() === rightOperand.getIndex();
            } else {
                result = leftOperand.value === rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Greater) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.CHAR &&
                rightOperand.typeId === TypesIds.CHAR) {
                result = leftOperand.value.charCodeAt(0) > rightOperand.value.charCodeAt(0);
            } else if(  leftOperand.typeId === TypesIds.ENUM &&
                        rightOperand.typeId === TypesIds.ENUM &&
                        Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() > rightOperand.getIndex();
            } else {
                result = leftOperand.value > rightOperand.value;
            }
            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Less) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.CHAR &&
                rightOperand.typeId === TypesIds.CHAR) {
                result = leftOperand.value.charCodeAt(0) < rightOperand.value.charCodeAt(0);
            } else if(  leftOperand.typeId === TypesIds.ENUM &&
                        rightOperand.typeId === TypesIds.ENUM &&
                        Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() < rightOperand.getIndex();
            } else {
                result = leftOperand.value < rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof GreaterOrEqual) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.CHAR &&
                rightOperand.typeId === TypesIds.CHAR) {
                result = leftOperand.value.charCodeAt(0) >= rightOperand.value.charCodeAt(0);
            } else if(  leftOperand.typeId === TypesIds.ENUM &&
                        rightOperand.typeId === TypesIds.ENUM &&
                        Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() >= rightOperand.getIndex();
            } else {
                result = leftOperand.value >= rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof LessOrEqual) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.CHAR &&
                rightOperand.typeId === TypesIds.CHAR) {
                result = leftOperand.value.charCodeAt(0) <= rightOperand.value.charCodeAt(0);
            } else if(  leftOperand.typeId === TypesIds.ENUM &&
                        rightOperand.typeId === TypesIds.ENUM &&
                        Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() <= rightOperand.getIndex();
            } else {
                result = leftOperand.value <= rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof NotEqual) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = null;
            if (leftOperand.typeId === TypesIds.ENUM &&
                rightOperand.typeId === TypesIds.ENUM &&
                Object.is(leftOperand.type, rightOperand.type)) {
                result = leftOperand.getIndex() !== rightOperand.getIndex();
            } else {
                result = leftOperand.value !== rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof In) {
            let leftOperand = await this.evaluateExpression(expression.left);
            let rightOperand = await this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = false;

            return new ScalarVariable(result, typeId)
        } else {
            return await this.evaluateSimpleExpression(expression, expectedType);
        }
    }

    async evaluateSimpleExpression(expression, expectedType = null)
    {
        if (expression instanceof Addition ||
                expression instanceof Subtraction) {

            let leftOperand = await this.evaluateSimpleExpression(expression.left);
            let rightOperand = await this.evaluateSimpleExpression(expression.right);
            let typeId = leftOperand.type instanceof StringType && rightOperand.type instanceof StringType ?
                    TypesIds.STRING :
                    leftOperand.typeId === TypesIds.REAL ||
                    rightOperand.typeId === TypesIds.REAL ? TypesIds.REAL : TypesIds.INTEGER;

            let result = null;
            if (expression instanceof Addition) {
                result = leftOperand.value + rightOperand.value;
            } else if (expression instanceof Subtraction) {
                result = leftOperand.value - rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof LogicalOr) {
            let leftOperand = await this.evaluateSimpleExpression(expression.left);
            let rightOperand = await this.evaluateSimpleExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = leftOperand.value || rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else {
            return await this.evaluateTerm(expression, expectedType);
        }
    }

    async evaluateTerm(expression, expectedType = null)
    {
        if (expression instanceof Not) {
            let term = await this.evaluateTerm(expression.value);
            return new ScalarVariable(!term.value, term.typeId);
        } else if (expression instanceof UnaryMinus) {
            let term = await this.evaluateTerm(expression.value);
            return new ScalarVariable(-term.value, term.typeId);
        } else if (expression instanceof Multiplication) {
            let leftOperand = await this.evaluateMultiplier(expression.left);
            let rightOperand = await this.evaluateMultiplier(expression.right);
            let typeId = leftOperand.typeId === TypesIds.REAL ||
                    rightOperand.typeId === TypesIds.REAL ? TypesIds.REAL : TypesIds.INTEGER;
            let result = leftOperand.value * rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Division) {
            let leftOperand = await this.evaluateMultiplier(expression.left);
            let rightOperand = await this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.REAL;
            let result = leftOperand.value / rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof IntegerDivision) {
            let leftOperand = await this.evaluateMultiplier(expression.left);
            let rightOperand = await this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.INTEGER;
            let result = Math.trunc(leftOperand.value / rightOperand.value);

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Modulo) {
            let leftOperand = await this.evaluateMultiplier(expression.left);
            let rightOperand = await this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.INTEGER;
            let result = leftOperand.value % rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof LogicalAnd) {
            let leftOperand = await this.evaluateMultiplier(expression.left);
            let rightOperand = await this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = leftOperand.value && rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else {
            return await this.evaluateMultiplier(expression, expectedType);
        }
    }

    async evaluateMultiplier(expression, expectedType = null)
    {
        if (expression instanceof Constant) {
            return new ScalarVariable(expression.symbol.value, expression.typeId);
        } else if (expression instanceof FunctionCall ||
                expression instanceof Identifier ||
                expression instanceof IndexedIdentifier ||
                expression instanceof GetByPointer ||
                expression instanceof TakeField) {

            return await this.evaluateIdentifierBranchRunner(expression, null, expectedType);
        } else {
            return await this.evaluateExpression(expression);
        }
    }

    addError(errorCode, errorText = null, treeNode = null)
    {
        let message = this.errorsDescription.getErrorTextByCode(errorCode) +
                (errorText === null ? '' : ('. ' + errorText));
        let currentPosition = treeNode === null ? null : treeNode.symbol.textPosition;
        throw new RuntimeError(errorCode, message, currentPosition);
    }

    async setIdentifierBranchValue(identifierBranch, expressionResult)
    {
        let currentScope = this.getCurrentScope();

        if (identifierBranch instanceof TakeField) {
            let recordVariable = await this.evaluateIdentifierBranch(identifierBranch.baseExpression);
            let propertyIdentifier = identifierBranch.subField;

            currentScope.setRecordVariableProperty(recordVariable, propertyIdentifier, expressionResult);
        } else {
            if (identifierBranch instanceof IndexedIdentifier) {
                this.evaluateIndexRing(identifierBranch.indexRing);
            }

            currentScope.setVariableValue(identifierBranch, expressionResult, identifierBranch);
        }
    }
};