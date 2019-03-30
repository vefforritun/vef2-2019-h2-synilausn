import { getCategories } from '../../api';
import useApi from '../../hooks/useApi';
import { ICategory } from '../../api/types';

// TODO Óþarfi

interface ICategoriesProps {
  children: (data: ICategory[], loading: boolean, error: string) => JSX.Element;
}

export default function Categories({ children }: ICategoriesProps) {
  const {items, loading, error} = useApi<ICategory[]>(getCategories.bind(null, { limit: 20 }), []);

  return children(items, loading, error);
}
