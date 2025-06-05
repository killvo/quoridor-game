import { AppStore } from './app-store.type';

type RootState = ReturnType<AppStore['getState']>;

export { type RootState };
