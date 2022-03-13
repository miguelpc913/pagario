import {getByText, render , screen, fireEvent, getByTestId, getByPlaceholderText} from '@testing-library/react';
import { DebtItems } from '../DebtItems';

test('should render debt' , () =>{
    render(<DebtItems></DebtItems>);
    const debtElement : HTMLElement = screen.getAllByTestId("debt-element")[0]
    expect(debtElement).toBeInTheDocument();
})

test('Should delete debt' , () =>{
    render(<DebtItems></DebtItems>);
    const debtElement : HTMLElement = screen.getAllByTestId("debt-element")[0]
    const removeElementButton : HTMLElement = getByTestId(debtElement ,"remove-debt");
    fireEvent.click(removeElementButton);
    expect(debtElement).not.toBeInTheDocument();
})

test('Should update debt name' , () =>{
    render(<DebtItems></DebtItems>);
    const debtElement : HTMLElement = screen.getAllByTestId("debt-element")[0]
    const changeNameInput : HTMLElement = getByPlaceholderText(debtElement ,"edit name");
    fireEvent.change(changeNameInput, {target: {value: 'asldsaodjqo[ijer[wirje[w'}})
    const element = getByText(debtElement , "asldsaodjqo[ijer[wirje[w")
})

test('Should update debt value' , () =>{
    render(<DebtItems></DebtItems>);
    const debtElement : HTMLElement = screen.getAllByTestId("debt-element")[0]
    const changeValueInput : HTMLElement = getByPlaceholderText(debtElement ,"edit value");
    fireEvent.change(changeValueInput, {target: {value: 12345}})
    const element = getByText(debtElement , "12345")
})