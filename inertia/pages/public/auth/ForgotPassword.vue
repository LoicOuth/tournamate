<script setup lang="ts">
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-vue-next'
import Logo from '~/assets/images/logo.png'

const { t } = useI18n()

const errors = computed(() => usePage().props.errors)
const success = computed(() => usePage().props.success as string | undefined)

const formData = useForm({
  email: '',
})
</script>

<template>
  <Head :title="t('forgotPassword.head')" />

  <div class="flex min-h-screen justify-center items-center bg-background">
    <div class="flex flex-col items-center gap-6">
      <div class="flex items-center">
        <img :src="Logo" alt="Logo" class="h-16 w-16 mr-2" />
        <h1 class="text-3xl font-bold">{{ t('publicLayout.title') }}</h1>
      </div>
      <Card class="w-[500px]">
        <CardHeader>
          <Button size="icon" variant="ghost" class="mb-2 cursor-pointer" as-child>
            <Link as="a" href="/login">
              <ArrowLeftIcon />
            </Link>
          </Button>
          <CardTitle>{{ t('forgotPassword.title') }}</CardTitle>
          <CardDescription>
            {{ t('forgotPassword.description') }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="!success" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <Label for="email">{{ t('forgotPassword.email') }}</Label>
              <Input
                v-model="formData.email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <span v-if="formData.errors.email || errors" class="text-red-500 text-xs">
                {{ formData.errors.email?.[0] || errors }}
              </span>
            </div>

            <Button
              type="submit"
              class="w-full"
              :loading="formData.processing"
              @click="formData.post('/password/forgot')"
            >
              {{ t('forgotPassword.send') }}
            </Button>
          </div>
          <div v-else class="flex flex-col items-center justify-center gap-5">
            <CheckCircleIcon class="text-green-500" :size="120" />
            <div class="text-lg">{{ t(success) }}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
