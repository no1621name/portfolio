import type { MatrixIntsance } from './matrix-transition.client';

declare module '#app' {
  interface NuxtApp {
    $matrix: (inst: MatrixIntsance | null) => void;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $matrix: (inst: MatrixIntsance | null) => void;
  }
}

export {};
