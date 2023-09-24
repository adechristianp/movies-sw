import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../../components/layout';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: () => jest.fn()
}));

describe('Layout Component', () => {
  it('render layout with title', () => {
    render(<Layout titleHeader="Test Title">test</Layout>);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('render layout with back button', () => {
    render(<Layout canBack={true}>test</Layout>);
    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
  });

  it('does not render back button', () => {
    render(<Layout titleHeader="Test Title" canBack={false} />);
    const backButton = screen.queryByTestId('back-button');
    expect(backButton).not.toBeInTheDocument();
  });
});
