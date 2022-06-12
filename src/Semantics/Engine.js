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
import { ArrayType } from '../SyntaxAnalyzer/Tree/Types/ArrayType.js';
import { Identifier } from '../SyntaxAnalyzer/Tree/Identifier.js';
import { Function } from '../SyntaxAnalyzer/Tree/Function.js';
import { Procedure } from '../SyntaxAnalyzer/Tree/Procedure.js';
import { Assignation } from '../SyntaxAnalyzer/Tree/Assignation.js';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes.js';
import { Constant } from '../SyntaxAnalyzer/Tree/Constant.js';
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
import { ProceduresStore } from './ProceduresStore.js';
import { FunctionsStore } from './FunctionsStore.js';
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
        this.proceduresStore = new ProceduresStore(config.input, config.outputStream, config.ouputNewLineSymbol);
        this.functionsStore = new FunctionsStore();
        this.errorsDescription = new ErrorsDescription();
    }
    /**
     * @return Scope
     */
    getCurrentScope()
    {
        return this.scopes[this.currentScopeId];
    }

    run()
    {
        this.setConstants();
        this.setTypes();
        this.setVariables();

        let self = this;
        if (this.tree.sentences) {
            this.tree.sentences.forEach(
                function(sentence)
                {
                    self.evaluateSentence(sentence);
                }
            );
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
                                    currentScope.setValue(identifier, initialValue.typeId, initialValue.symbol.value, initialValue);
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

    evaluateIndexRing(indexRing)
    {
        indexRing.evaluatedIndexExpression = this.evaluateExpression(indexRing.indexExpression);
        if (indexRing.indexRing instanceof IndexRing) {
            this.evaluateIndexRing(indexRing.indexRing);
        }

        return indexRing;
    }

    evaluateIdentifierBranch(identifierBranchExpression)
    {
        if (identifierBranchExpression instanceof Identifier) {
            let currentScope = this.getCurrentScope();
            let name = identifierBranchExpression.symbol.value;
            let result = null;
            result = currentScope.getElementByIdentifier(identifierBranchExpression);

            if (result !== null) {
                return result;
            }
            let lowerCaseName = name.toLowerCase();

            let isDeclaredProcedure = this.tree.procedures.hasOwnProperty(lowerCaseName);
            let procedure = isDeclaredProcedure ?
                this.tree.procedures[lowerCaseName]:
                this.proceduresStore.getProcedure(lowerCaseName);
            if (procedure !== null) {
                return new CallableVariable(procedure.type, procedure);
            }
            let isDeclaredFunction = this.tree.functions.hasOwnProperty(lowerCaseName);
            let calledFunction = isDeclaredFunction ?
                this.tree.functions[lowerCaseName]:
                this.functionsStore.getFunction(lowerCaseName);
            if (calledFunction !== null) {
                return  new CallableVariable(calledFunction.type, calledFunction);
            }
            this.addError(ErrorsCodes.variableNotDeclared, `Element '${name}' not declared.`, identifierBranchExpression);
        } else if (identifierBranchExpression instanceof IndexedIdentifier) {
            let currentScope = this.getCurrentScope();

            let arrayVariable = this.evaluateIdentifierBranch(identifierBranchExpression.identifier);
            if (!(arrayVariable instanceof ArrayVariable)) {
                this.addError(ErrorsCodes.arrayExpected, 'Array expected', identifierBranchExpression);
            }

            identifierBranchExpression.indexRing = this.evaluateIndexRing(identifierBranchExpression.indexRing);
            return arrayVariable.getByIndexRing(identifierBranchExpression.indexRing);

        } else if (identifierBranchExpression instanceof FunctionCall) {
            let isDeclaredProcedure = null;
            let isDeclaredFunction = null;

            let returnedElem = this.evaluateIdentifierBranch(identifierBranchExpression.identifierBranch);
            let calledElem = returnedElem instanceof CallableVariable ?
                        returnedElem.value :
                        returnedElem;

            let currentScope = this.getCurrentScope();
            let scope = new Scope(currentScope);
            let procedureName = null;
            if (calledElem instanceof FunctionItem ||
                    calledElem instanceof Function) {
                let procedureIdentifier = calledElem.name;
                procedureName = procedureIdentifier.symbol.value.toLowerCase();

                scope.addVariable(procedureIdentifier, calledElem.type.returnType);
                scope.callableName = calledElem.name.symbol.value;
            }

            this.addParametersToScope(identifierBranchExpression.parameters, calledElem.type.signature, scope);

            this.treesCounter++;

            this.tree = calledElem;
            this.trees[this.treesCounter] = this.tree;
            this.currentScopeId++;
            this.scopes[this.currentScopeId] = scope;

            this.run();

            if (typeof calledElem.innerRun === 'function' ) {
                calledElem.innerRun(scope, this);
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
            let pointerVariable = this.evaluateIdentifierBranch(identifierBranchExpression.pointer);
            return pointerVariable.variable;
        } else if (identifierBranchExpression instanceof TakeField) {
            let baseExpression = this.evaluateIdentifierBranch(identifierBranchExpression.baseExpression);
            let propertyIdentifier = identifierBranchExpression.subField;
            return baseExpression.getByPropertyIdentifier(propertyIdentifier);
        } else {
            this.addError(ErrorsCodes.typesMismatch, 'Identifier branch expected.', identifierBranchExpression);
        }
    }

    evaluateSentence(sentence)
    {
        let currentScope = this.getCurrentScope();

        if (sentence instanceof Assignation) {
            let destination = sentence.destination;
            let sourceExpression = sentence.sourceExpression;
            let expressionResult = this.evaluateExpression(sourceExpression);
            let type = expressionResult.getType();

            if (destination instanceof TakeField) {
                let recordVariable = this.evaluateIdentifierBranch(destination.baseExpression);
                let propertyIdentifier = destination.subField;

                currentScope.setRecordVariableProperty(recordVariable, propertyIdentifier, expressionResult);

            } else {
                if (destination instanceof IndexedIdentifier) {
                    destination.indexRing = this.evaluateIndexRing(destination.indexRing);
                }

                currentScope.setVariableValue(destination, expressionResult, sentence.destination);
            }
        } else if (sentence instanceof CompoundOperator) {
            if (sentence.sentences) {
                let sentences = sentence.sentences;
                let sentencesNumber = sentences.length;
                for (let i = 0; i < sentencesNumber; i++) {
                    let result = this.evaluateSentence(sentences[i]);
                    if (result instanceof Break) {
                        return result;
                    }
                }
            }
        } else if (sentence instanceof Implication) {
            let condition = this.evaluateExpression(sentence.condition);

            if (condition.value === true) {
                return this.evaluateSentence(sentence.left);
            } else {
                return this.evaluateSentence(sentence.right);
            }
        } else if ( sentence instanceof FunctionCall ||
                    sentence instanceof ProcedureCall) {
            return this.evaluateIdentifierBranch(sentence);
        } else if (sentence instanceof WhileCycle) {
            let currentScope = this.getCurrentScope();
            currentScope.cycleDepth++;
            while (this.evaluateExpression(sentence.condition).value === true) {
                let result = this.evaluateSentence(sentence.body);
                if (result instanceof Break) {
                    break;
                }
            }
            currentScope.cycleDepth--;
        } else if (sentence instanceof RepeatCycle) {
            let currentScope = this.getCurrentScope();
            currentScope.cycleDepth++;
            do {
                let result = this.evaluateSentence(sentence.body);
                if (result instanceof Break) {
                    break;
                }
            } while (this.evaluateExpression(sentence.condition).value !== true)
            currentScope.cycleDepth--;
        } else if (sentence instanceof ForCycle) {
            let currentScope = this.getCurrentScope();
            let variableIdentifier = sentence.variableIdentifier;
            let currentValue = this.evaluateExpression(sentence.initExpression);
            let lastValue = this.evaluateExpression(sentence.lastExpression);

            let increment = null;
            let comparation = null;
            let typeId = currentValue.typeId;
            let type = currentValue.type === false ? typeId : currentValue.type;
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
                new ScalarVariable(currentValue.value, typeId);
            let canContinue = true;
            while (comparation(currentValue, lastValue) && canContinue) {
                let result = this.evaluateSentence(sentence.body);
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
            let switchValue = this.evaluateExpression(sentence.switchExpression);
            let caseFound = false;
            let currentScope = this.getCurrentScope();

            for (let i = 0; i <  sentence.cases.length; i++) {
                let caseItem = sentence.cases[i];
                for(let j = 0; j < caseItem.constants.length; j++) {
                    let constant = caseItem.constants[j];
                    if (!currentScope.sameType(constant.typeId, switchValue.getType())) {
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
        }
    }

    addParametersToScope(parameters, signature, scope)
    {
        let self = this;
        if (signature instanceof UnboundedParametersList) {
            if (signature.byReference) {
                scope.setParametersList(parameters);
            } else {
                let parametersValues = parameters.map(elem => this.evaluateExpression(elem));
                scope.setParametersList(parametersValues);
            }
        } else {
            let parametersCounter = 0;
            signature.forEach(function(appliedType) {
                let identifiers = appliedType.identifiers;
                let byReference = appliedType.byReference;
                identifiers.forEach(function(identifier) {
                    let type = appliedType.type;
                    let parameter = parameters[parametersCounter];
                    if (byReference) {
                        if (!(parameter instanceof Identifier)) {
                            self.addError(ErrorsCodes.identifierExpected, 'Cannot use other expressions here', parameter);
                        }
                        scope.addVariableByReference(parameter, identifier);
                    } else {
                        let result = self.evaluateExpression(parameter);
                        scope.addVariable(identifier, type);
                        scope.setValue(identifier, type, result.value, identifier);
                    }
                    parametersCounter++;
                });
            });
        }
    }

    evaluateExpression(expression)
    {
        if (expression instanceof GetPointer) {
            let indentifierBranch = expression.identifier;
            let identifierBranchResult = this.evaluateIdentifierBranch(indentifierBranch);
            let type = identifierBranchResult.getType();
            return new PointerVariable(identifierBranchResult, type);
        } else if (expression instanceof Equal) {
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
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
            let leftOperand = this.evaluateExpression(expression.left);
            let rightOperand = this.evaluateExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = false;

            return new ScalarVariable(result, typeId)
        } else {
            return this.evaluateSimpleExpression(expression);
        }
    }

    evaluateSimpleExpression(expression)
    {
        if (expression instanceof Addition ||
                expression instanceof Subtraction) {

            let leftOperand = this.evaluateSimpleExpression(expression.left);
            let rightOperand = this.evaluateSimpleExpression(expression.right);
            let typeId = leftOperand.typeId === TypesIds.REAL ||
                    rightOperand.typeId === TypesIds.REAL ? TypesIds.REAL : TypesIds.INTEGER;

            let result = null;
            if (expression instanceof Addition) {
                result = leftOperand.value + rightOperand.value;
            } else if (expression instanceof Subtraction) {
                result = leftOperand.value - rightOperand.value;
            }

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof LogicalOr) {
            let leftOperand = this.evaluateSimpleExpression(expression.left);
            let rightOperand = this.evaluateSimpleExpression(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = leftOperand.value || rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else {
            return this.evaluateTerm(expression);
        }
    }

    evaluateTerm(expression)
    {
        if (expression instanceof Not) {
            let term = this.evaluateTerm(expression.value);
            return new ScalarVariable(!term.value, term.typeId);
        } else if (expression instanceof UnaryMinus) {
            let term = this.evaluateTerm(expression.value);
            return new ScalarVariable(-term.value, term.typeId);
        } else if (expression instanceof Multiplication) {
            let leftOperand = this.evaluateMultiplier(expression.left);
            let rightOperand = this.evaluateMultiplier(expression.right);
            let typeId = leftOperand.typeId === TypesIds.REAL ||
                    rightOperand.typeId === TypesIds.REAL ? TypesIds.REAL : TypesIds.INTEGER;
            let result = leftOperand.value * rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Division) {
            let leftOperand = this.evaluateMultiplier(expression.left);
            let rightOperand = this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.REAL;
            let result = leftOperand.value / rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof IntegerDivision) {
            let leftOperand = this.evaluateMultiplier(expression.left);
            let rightOperand = this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.INTEGER;
            let result = Math.trunc(leftOperand.value / rightOperand.value);

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof Modulo) {
            let leftOperand = this.evaluateMultiplier(expression.left);
            let rightOperand = this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.INTEGER;
            let result = leftOperand.value % rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else if (expression instanceof LogicalAnd) {
            let leftOperand = this.evaluateMultiplier(expression.left);
            let rightOperand = this.evaluateMultiplier(expression.right);
            let typeId = TypesIds.BOOLEAN;
            let result = leftOperand.value && rightOperand.value;

            return new ScalarVariable(result, typeId);
        } else {
            return this.evaluateMultiplier(expression);
        }
    }

    evaluateMultiplier(expression)
    {
        if (expression instanceof Constant) {
            return new ScalarVariable(expression.symbol.value, expression.typeId);
        } else if (expression instanceof FunctionCall ||
                expression instanceof Identifier ||
                expression instanceof IndexedIdentifier ||
                expression instanceof GetByPointer ||
                expression instanceof TakeField) {

            return this.evaluateIdentifierBranch(expression);
        } else {
            return this.evaluateExpression(expression);
        }
    }

    addError(errorCode, errorText = null, treeNode = null)
    {
        let message = this.errorsDescription.getErrorTextByCode(errorCode) +
                (errorText === null ? '' : ('. ' + errorText));
        let currentPosition = treeNode === null ? null : treeNode.symbol.textPosition;
        throw new RuntimeError(errorCode, message, currentPosition);
    }

    setIdentifierBranchValue(identifierBranch, expressionResult)
    {
        let currentScope = this.getCurrentScope();

        if (identifierBranch instanceof TakeField) {
            let recordVariable = this.evaluateIdentifierBranch(identifierBranch.baseExpression);
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