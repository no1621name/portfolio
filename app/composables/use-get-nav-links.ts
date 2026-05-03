import type { NavLink } from '~/types/navigation';

export const useGetNavLinks = async (): Promise<NavLink[]> => {
  const { locale } = useI18n();
  const { data } = await useAsyncData('nav-links', () =>
    queryCollection(`content_${locale.value}`)
      .select('title', 'navigation', 'path')
      .all()
  );

  if (!data.value) return [];

  return data.value.map(item => ({
    symbol: typeof item.navigation === 'object' ? item.navigation.icon : '',
    path: item.path.split('/pages')[1] ?? '/',
    label: item.title
  }));
};
