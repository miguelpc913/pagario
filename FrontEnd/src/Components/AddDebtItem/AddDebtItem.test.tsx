import {getByText, render , screen, fireEvent} from '@testing-library/react';
import {DebtItems} from '../../Pages/Homepage/DebtItems/DebtItems';

test('Should add component' , () =>{
    render(<DebtItems></DebtItems>);
    const addNameInput : HTMLElement = screen.getByPlaceholderText(/Add name/i);
    const addTypeInput : HTMLElement = screen.getByPlaceholderText(/Add type/i);
    const addDescriptionInput : HTMLElement = screen.getByPlaceholderText(/Add description/i);
    const addValueInput : HTMLElement = screen.getByPlaceholderText(/Add value/i);
    const addDebt : HTMLElement = screen.getByText(/Add debt/i);
    fireEvent.change(addNameInput, {target: {value: "test4"}})
    fireEvent.change(addTypeInput, {target: {value: "onlytest"}})
    fireEvent.change(addDescriptionInput, {target: {value: "test"}})
    fireEvent.change(addValueInput, {target: {value: "4"}})
    fireEvent.click(addDebt);
    const newDebt = screen.getByText(/test4/i)
    expect(newDebt).toBeInTheDocument(); 
})