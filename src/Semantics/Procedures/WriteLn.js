import { ProcedureItem } from '../ProcedureItem';

export class WriteLn extends ProcedureItem
{
    constructor()
    {
        super();
    }

    innerRun(scope)
    {
        let parametersList = scope.getVariable('parametersList');

        console.log(parametersList.value.map(elem => elem.value).join(' '));
    }
};