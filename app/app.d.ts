declare module 'nuxt/schema' {
  interface AppConfig {
    defaultInfo: {
      url: string;
      name: string;
      description: string;
      locale: string;
      projectDescription: string;
    };
  }
}

export { };
