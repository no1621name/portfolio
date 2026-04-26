import type { RunMatrix } from '~/components/matrix-transition.vue';

export interface MatrixIntsance {
  run: RunMatrix;
}

export default defineNuxtPlugin({
  name: 'matrix-transition',
  setup() {
    const matrixRef = shallowRef<MatrixIntsance | null>(null);

    useRouter().afterEach(() => {
      matrixRef.value?.run();
    });

    return {
      provide: {
        matrix: (matrix: MatrixIntsance) => (matrixRef.value = matrix)
      }
    };
  }
});
