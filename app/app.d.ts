declare module 'nuxt/schema' {
  interface AppConfig {
    defaultInfo: {
      url: string;
      name: string;
      description: string;
      locale: string;
      project: string;
    };
  }
}

export { };
