<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { type ContentSchema, contactSchema } from '@@/shared/schemas/contact';

const { t } = useI18n();

const initialState: ContentSchema = {
  name: '',
  telegram: '',
  message: ''
};
const state = reactive<ContentSchema>({ ...initialState });

const loading = ref(false);
const success = ref(false);
const error = ref('');

watch(state, (newState) => {
  const isReset = !newState.name && !newState.telegram && !newState.message;
  if (isReset) return;

  if (success.value) success.value = false;
  if (error.value) error.value = '';
}, { deep: true });

const { csrf, headerName } = useCsrf();

const onSubmit = async (event: FormSubmitEvent<ContentSchema>) => {
  loading.value = true;
  success.value = false;
  error.value = '';
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data,
      headers: {
        [headerName]: csrf
      }
    });
    success.value = true;
    Object.assign(state, initialState);
  }
  catch {
    error.value = t('contactForm.error');
  }
  finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <UForm
      :state="state"
      :schema="contactSchema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField
        :label="t('contactForm.nameLabel')"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          class="w-full"
          :placeholder="t('contactForm.namePlaceholder')"
        />
      </UFormField>

      <UFormField
        :label="t('contactForm.telegramLabel')"
        name="telegram"
        required
      >
        <UInput
          v-model="state.telegram"
          class="w-full"
          :placeholder="t('contactForm.telegramPlaceholder')"
        />
      </UFormField>

      <UFormField
        :label="t('contactForm.messageLabel')"
        name="message"
        :hint="t('contactForm.messageHint')"
        :ui="{ hint: 'text-toned!' }"
      >
        <UTextarea
          v-model="state.message"
          class="w-full"
          :placeholder="t('contactForm.messagePlaceholder')"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
      >
        {{ t('contactForm.submit') }}
      </UButton>

      <p
        v-if="success"
        class="text-success"
      >
        {{ t('contactForm.success') }}
      </p>
      <p
        v-if="error"
        class="text-error"
      >
        {{ error }}
      </p>
    </UForm>
  </div>
</template>
