import { render, screen } from '@testing-library/react';
import {Homepage} from './Homepage';
import { User } from "../../Models/User";

test('renders component', () => {
  render(<Homepage name={"Miguel"} age={0} gender={''} id={0} phoneNumber={''} />);
  const rusty = screen.getByText(/miguel/i);
  expect(rusty).toBeInTheDocument();
});


