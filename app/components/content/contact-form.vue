<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { computed, reactive, ref, watch } from 'vue';
import { createContactSchema, type ContactSchema } from '@@/shared/schemas/contact';
import { messages } from '@@/i18n';

const { t, locale } = useI18n();

const initialState: ContactSchema = {
  name: '',
  telegram: '',
  message: ''
};

const state = reactive<ContactSchema>({ ...initialState });

const contactSchema = computed(() => createContactSchema(locale.value, messages));

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

const onSubmit = async (event: FormSubmitEvent<ContactSchema>) => {
  loading.value = true;
  success.value = false;
  error.value = '';
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data,
      headers: {
        [headerName]: csrf
      },
      query: {
        locale: locale.value
      }
    })
      .then(() => {
        success.value = true;
        Object.assign(state, initialState);
      })
      .catch((e) => {
        if (e.data.message) {
          error.value = e.data.message;
        }
      });
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
