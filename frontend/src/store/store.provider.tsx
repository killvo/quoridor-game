import { JSX } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

interface StoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => <Provider store={store}>{children}</Provider>;

export { StoreProvider };
