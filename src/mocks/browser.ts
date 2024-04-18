import { setupWorker } from 'msw/browser';
import { setupServer } from 'msw/node';
import { handlers } from 'src/mocks/handlers';

export const server = setupServer(...handlers);
export const worker = setupWorker(...handlers);
