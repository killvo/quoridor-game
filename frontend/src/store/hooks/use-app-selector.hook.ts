import { useSelector } from 'react-redux';

import { type RootState } from '../types/root-state.type';

const useAppSelector = useSelector.withTypes<RootState>();

export { useAppSelector };
