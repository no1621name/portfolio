import type { NavLink, TerminalMenuItem } from '~/types/navigation';
import { useGetPageCollectionKey } from './use-get-collection-keys';

export const useGetNavLinks = async (): Promise<NavLink[]> => {
  const key = useGetPageCollectionKey();
  const { data } = await useAsyncData('nav-links', () =>
    queryCollection(key.value)
      .select('title', 'navigation', 'path')
      .all()
  );

  if (!data.value) return [];

  return data.value.map(item => ({
    symbol: typeof item.navigation === 'object' ? item.navigation.icon : '',
    path: item.path ?? '/',
    label: item.title
  }));
};

export const useGetTerminalMenuLinks = async (): Promise<TerminalMenuItem[]> => {
  const key = useGetPageCollectionKey();
  const { data } = await useAsyncData('terminal-menu-links', () =>
    queryCollection(key.value)
      .select('title', 'terminalMenuLabel', 'path')
      .all()
  );

  if (!data.value) return [];

  return data.value.map(item => !item.terminalMenuLabel
    ? null
    : ({
        label: item.terminalMenuLabel,
        path: item.path ?? '/'
      })).filter(Boolean) as TerminalMenuItem[];
};
