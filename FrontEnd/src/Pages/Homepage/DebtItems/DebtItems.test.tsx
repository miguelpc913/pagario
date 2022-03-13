import {getByText, render , screen, fireEvent} from '@testing-library/react';
import {DebtItems} from './DebtItems';
import { Debt } from '../../../Models/Debt';

test('Should render multiple debts' , () =>{
    // render(<DebtItems></DebtItems>);
    // const debtElements = screen.getAllByTestId("debt-element");
    // debtElements.forEach( (debtElement : HTMLElement, i: number) =>{
    //     const debtTitle = getByText(debtElement , debts[i].name)
    //     expect(debtTitle).toBeInTheDocument();
    // })
})
