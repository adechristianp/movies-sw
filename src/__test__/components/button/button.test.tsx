import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultButton from '../../../components/button';

const tests = [
  {
    input: 'Clear Cart',
    expect: 'Clear Cart'
  },
  {
    input: '',
    expect: ''
  },
  {
    input: undefined,
    expect: ''
  }
];

describe('button', () => {
  tests.forEach(e => {
    it(`should render test: ${e.expect}`, () => {
      render(<DefaultButton label={e.input} />);
      const buttonText = screen.getByTestId('button');
      expect(buttonText).toBeInTheDocument();
      expect(buttonText).toHaveTextContent(e.expect);
    });
  });
    it('Test click event', () => {
      const mockCallBack = jest.fn();
      render(<DefaultButton onClick={mockCallBack} testId='test-callback'/>);
      const testCallback = screen.getByTestId('test-callback');
      fireEvent.click(testCallback);
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})