export function useProjectFilters() {
  const route = useRoute();
  const router = useRouter();

  function updateQuery(updates: Record<string, string | undefined>) {
    const query: Record<string, string> = {};
    for (const [key, value] of Object.entries({ ...route.query, ...updates })) {
      if (value) {
        query[key] = Array.isArray(value) ? value.join(',') : value;
      }
    }
    router.replace({ query });
  }

  const searchQuery = computed({
    get: () => (route.query.search as string) ?? '',
    set: (val: string) => updateQuery({ search: val || undefined })
  });

  const selectedStack = computed({
    get: () => {
      const query = route.query.stack as string;
      return query ? query.split(',').filter(Boolean) : [];
    },
    set: (val: string[]) => updateQuery({ stack: val.length ? val.join(',') : undefined })
  });

  const selectedCompanies = computed({
    get: () => {
      const query = route.query.company as string;
      return query ? query.split(',').filter(Boolean) : [];
    },
    set: (val: string[]) => updateQuery({ company: val.length ? val.join(',') : undefined })
  });

  return { searchQuery, selectedStack, selectedCompanies };
}
