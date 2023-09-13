import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Product from '../Product';

describe('Product component', () => {
  it('renders without errors', () => {
    render(<Product />);
  });

  test('displays product cards', () => {
    const comp = render(<Product />);
    const test = comp.getByTestId("dataTestId")
    const toggleBtn = comp.getByText("PROCESS SALE")
    const CANCELSaleBtn = comp.getByText("CANCEL SALE")
    const discountInput = comp.getByTestId("discount-input")
    const vatInput = comp.getByTestId("vat-input")
    
    fireEvent.click(test)
    fireEvent.click(toggleBtn)
    fireEvent.click(CANCELSaleBtn)
    // fireEvent.click(productListBtn)
    fireEvent.change(discountInput, {
        target: { value: "n" }
      })
    fireEvent.change(vatInput, {
        target: { value: "101" }
      })
    
    expect(test).toBeTruthy();
  });

  it('displays product cards', () => {
    const comp = render(<Product />);
    const vatInput = comp.getByTestId("vat-input")
    fireEvent.change(vatInput, {
        target: { value: "99" }
      })
    
    expect(comp).toBeTruthy();
  });


});