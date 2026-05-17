import type { RunMatrix } from '~/components/ui/matrix-transition.vue';

export interface MatrixIntsance {
  run: RunMatrix;
}

export default defineNuxtPlugin({
  name: 'matrix-transition',
  setup() {
    const skipPageTransition = useSkipPageTransition();
    const { afterEach, beforeEach } = useRouter();
    const matrixRef = shallowRef<MatrixIntsance | null>(null);

    beforeEach((to, from) => {
      const isLangSwitch = to.params.slug?.[0] === from.params.slug?.[0];
      skipPageTransition.value = isLangSwitch;
    });

    afterEach((to, from) => {
      const isLangSwitch = to.params.slug?.[0] === from.params.slug?.[0];
      if (!isLangSwitch) {
        matrixRef.value?.run();
      }
    });

    return {
      provide: {
        matrix: (matrix: MatrixIntsance) => (matrixRef.value = matrix)
      }
    };
  }
});
