import {vi} from 'vitest'
import { render, screen } from '@testing-library/react';
import GlobalProvider from '../context/GlobalProvider';
import App from '../App';
import MOCK_API from './mock/mockAPI';
import userEvent from '@testing-library/user-event';

const MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => MOCK_API,
} as Response;

const mockFetch = () => vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

beforeEach(() => {
  mockFetch();
});
afterEach(() => {
  vi.clearAllMocks();
});

describe('Testa se ao iniciar a aplicação é feita a requisição dos planetas experados e se determinados elementos de inputs estão presentes', () => {
  test('Testa se ao carregar a páginas é exibido na tela os planetas esperados', async () => {
    render(
      <GlobalProvider>
        <App />
      </GlobalProvider>
    );
    
    const category = await screen.findByText(/Name/i);
    const firstPlanet = await screen.findByText(/Tatooine/i);
    const LastPlanete = await screen.findByText(/Kamino/i);
    expect(firstPlanet).toBeInTheDocument();
    expect(LastPlanete).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  });
  test('Testa se os campos de inpus estão presentes na aplicação e se tem o funcionamento esperado', async () => {
    render(
      <GlobalProvider>
        <App />
      </GlobalProvider>
    );
    
    const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();

    await userEvent.selectOptions(columnSelect, 'population');
    expect(columnSelect).toHaveValue('population');

    const operatorSelect = screen.getByTestId('comparison-filter');
    expect(operatorSelect).toBeInTheDocument();

    await userEvent.selectOptions(operatorSelect, 'maior que');
    expect(operatorSelect).toHaveValue('maior que');

    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();

    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, '1001');
    expect(valueInput).toHaveValue(1001);

    const filterBtn = screen.getByRole('button', {name: 'FILTRAR'});
    expect(filterBtn).toBeInTheDocument();

    await userEvent.click(filterBtn);

    // const unflitredPlanet = screen.getByText(/yavin/i);
    // expect(unflitredPlanet).not.toBeInTheDocument();
  });
  
  test('Testa se os campos de inpus de ordenação estão presentes na aplicação e se tem o funcionamento esperado', async () => {
    render(
      <GlobalProvider>
        <App />
      </GlobalProvider>
    );
    
    const columnSelect = screen.getByTestId('column-sort');
    expect(columnSelect).toBeInTheDocument();

    await userEvent.selectOptions(columnSelect, 'diameter');
    expect(columnSelect).toHaveValue('diameter');

    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    expect(asc).toBeInTheDocument();
    await userEvent.click(asc);
    expect(asc).toBeChecked();
    expect(desc).not.toBeChecked();
    await userEvent.click(desc);
    expect(desc).toBeChecked();
    expect(asc).not.toBeChecked();
    
  });
});