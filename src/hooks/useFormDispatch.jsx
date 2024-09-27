import { useDispatch } from 'react-redux';

export const useFormDispatch = () => {
  const dispatch = useDispatch();
  return dispatch;
};
