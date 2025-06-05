import { useStore } from 'react-redux';

import { type AppStore } from '../types/app-store.type';

const useAppStore = useStore.withTypes<AppStore>();

export { useAppStore };
