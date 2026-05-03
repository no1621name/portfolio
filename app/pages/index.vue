<script setup lang="ts">
const colorMode = useColorMode();
const selected = ref('Option 1');

const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
]);
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h2 class="font-heading text-2xl">
        // welcome
      </h2>
      <p class="text-muted">
        Current theme: <span class="text-primary">{{ colorMode.preference }}</span>
      </p>
      <p class="text-muted">
        This is a terminal-inspired portfolio with three themes:
      </p>
      <ul class="list-disc list-inside space-y-2 text-toned">
        <li><span class="text-primary">green</span> - Classic terminal green</li>
        <li><span class="text-primary">mono</span> - Black and white minimal</li>
        <li><span class="text-primary">ibm</span> - Amber terminal style</li>
      </ul>
    </section>

    <section class="space-y-4">
      <h2 class="font-heading text-2xl">
        // design system
      </h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-heading text-lg mb-2">
            Colors
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 border border-default">
              <p class="text-primary mb-2">
                Primary
              </p>
              <p class="text-sm text-muted">
                Main actions
              </p>
            </div>
            <div class="p-4 border border-default">
              <p class="text-secondary mb-2">
                Secondary
              </p>
              <p class="text-sm text-muted">
                Alternative actions
              </p>
            </div>
            <div class="p-4 border border-default">
              <p class="text-success mb-2">
                Success
              </p>
              <p class="text-sm text-muted">
                Positive states
              </p>
            </div>
            <div class="p-4 border border-default">
              <p class="text-error mb-2">
                Error
              </p>
              <p class="text-sm text-muted">
                Destructive states
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-heading text-lg mb-2">
            Typography
          </h3>
          <div class="space-y-2">
            <p class="text-3xl font-heading">
              Heading 3xl
            </p>
            <p class="text-2xl font-heading">
              Heading 2xl
            </p>
            <p class="text-xl font-heading">
              Heading xl
            </p>
            <p class="text-lg font-heading">
              Heading lg
            </p>
            <p class="text-md">
              Body text md
            </p>
            <p class="text-sm">
              Body text sm
            </p>
            <p class="text-xs">
              Body text xs
            </p>
          </div>
        </div>

        <div>
          <h3 class="font-heading text-lg mb-2">
            Components
          </h3>
          <div class="space-y-4">
            <div>
              <p class="text-muted mb-2">
                Buttons:
              </p>
              <div class="flex gap-2 flex-wrap">
                <UButton>Default</UButton>
                <UButton color="primary">
                  Primary
                </UButton>
                <UButton color="secondary">
                  Secondary
                </UButton>
                <UButton variant="outline">
                  Outline
                </UButton>
                <UButton variant="ghost">
                  Ghost
                </UButton>
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Links:
              </p>
              <div class="space-y-1">
                <a
                  href="#"
                  class="text-primary hover:underline"
                >gh://username</a>
                <a
                  href="#"
                  class="text-primary hover:underline"
                >mail://email@example.com</a>
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Progress bar:
              </p>
              <div class="w-full h-1 bg-muted">
                <div
                  class="h-full bg-primary"
                  style="width: 75%"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-heading text-lg mb-2">
            Form Components
          </h3>
          <div class="space-y-4">
            <div>
              <p class="text-muted mb-2">
                Input fields:
              </p>
              <div class="space-y-2">
                <UInput placeholder="Default input" />
                <UInput
                  placeholder="Primary input"
                  color="primary"
                />
                <UInput
                  placeholder="Error state"
                  color="error"
                />
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Textarea:
              </p>
              <UTextarea placeholder="Enter your message" />
            </div>

            <div>
              <p class="text-muted mb-2">
                Checkbox:
              </p>
              <div class="space-y-2">
                <UCheckbox label="Remember me" />
                <UCheckbox
                  label="Accept terms"
                  model-value
                />
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Radio buttons:
              </p>
              <URadioGroup
                v-model="selected"
                :options="['Option 1', 'Option 2', 'Option 3']"
              />
            </div>

            <div>
              <p class="text-muted mb-2">
                Select:
              </p>
              <USelect
                :options="['Option 1', 'Option 2', 'Option 3']"
                placeholder="Choose an option"
              />
            </div>

            <div>
              <p class="text-muted mb-2">
                Switch:
              </p>
              <div class="space-y-2">
                <USwitch />
                <USwitch model-value />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-heading text-lg mb-2">
            Data Display Components
          </h3>
          <div class="space-y-4">
            <div>
              <p class="text-muted mb-2">
                Card:
              </p>
              <UCard>
                <template #header>
                  <p class="font-heading">
                    Card Header
                  </p>
                </template>
                <p class="text-muted">
                  Card content goes here
                </p>
                <template #footer>
                  <p class="text-sm text-muted">
                    Card footer
                  </p>
                </template>
              </UCard>
            </div>

            <div>
              <p class="text-muted mb-2">
                Badges:
              </p>
              <div class="flex gap-2 flex-wrap">
                <UBadge>Default</UBadge>
                <UBadge color="primary">
                  Primary
                </UBadge>
                <UBadge color="success">
                  Success
                </UBadge>
                <UBadge color="warning">
                  Warning
                </UBadge>
                <UBadge color="error">
                  Error
                </UBadge>
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Avatar:
              </p>
              <div class="flex gap-2">
                <UAvatar />
                <UAvatar src="https://i.pravatar.cc/150?img=1" />
                <UAvatar size="lg" />
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Progress:
              </p>
              <div class="space-y-2">
                <UProgress :value="33" />
                <UProgress
                  :value="66"
                  color="primary"
                />
                <UProgress
                  :value="100"
                  color="success"
                />
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Alert:
              </p>
              <div class="space-y-2">
                <UAlert
                  title="Info"
                  description="This is an info alert"
                />
                <UAlert
                  title="Success"
                  color="success"
                  description="Operation completed successfully"
                />
                <UAlert
                  title="Warning"
                  color="warning"
                  description="Please review this warning"
                />
                <UAlert
                  title="Error"
                  color="error"
                  description="An error occurred"
                />
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Table:
              </p>
              <UTable
                :data="data"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-heading text-lg mb-2">
            Effects
          </h3>
          <div class="space-y-4">
            <div>
              <p class="text-muted mb-2">
                Glow effect:
              </p>
              <div class="glow p-4 border border-default inline-block">
                <span class="text-primary">Glowing element</span>
              </div>
            </div>

            <div>
              <p class="text-muted mb-2">
                Cursor effect:
              </p>
              <span class="cursor">Typing text</span>
            </div>

            <div>
              <p class="text-muted mb-2">
                Scanlines:
              </p>
              <div class="relative p-4 border border-default">
                <div class="scanlines absolute inset-0" />
                <span class="text-primary relative z-10">Content with scanlines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
