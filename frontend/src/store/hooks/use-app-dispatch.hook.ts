import { useDispatch } from 'react-redux';

import { type AppDispatch } from '../types/app-dispatch.type';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppDispatch };
