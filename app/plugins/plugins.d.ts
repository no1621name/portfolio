import type { MatrixInstance } from './matrix-transition.client';

declare module '#app' {
  interface NuxtApp {
    $matrix: (inst: MatrixInstance | null) => void;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $matrix: (inst: MatrixInstance | null) => void;
  }
}

export { };
