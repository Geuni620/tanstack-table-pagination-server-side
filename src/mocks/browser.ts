import { setupServer } from 'msw/node';
import { handlers } from 'src/mocks/handlers';

export const worker = setupServer(...handlers);
