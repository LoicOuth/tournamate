<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
import Logo from '~/assets/images/logo.png'

const { t } = useI18n()

const errors = computed(() => usePage().props.errors)

const props = defineProps({
  id: { type: Number, required: true },
})

const formData = useForm({
  id: props.id,
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <Head :title="t('resetPassword.head')" />
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
          <CardTitle>{{ t('resetPassword.title') }}</CardTitle>
          <CardDescription>
            {{ t('resetPassword.description') }}
            <Alert v-if="errors" variant="destructive" class="mt-5">
              <AlertDescription>
                {{ t(errors.toString()) }}
              </AlertDescription>
            </Alert>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <Label for="password">{{ t('resetPassword.password') }}</Label>
              <Input v-model="formData.password" id="password" type="password" required />
              <span v-if="formData.errors.password" class="text-red-500 text-xs">
                {{ formData.errors.password[0] }}
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <Label for="password_confirmation">{{ t('resetPassword.confirmedPassword') }}</Label>
              <Input
                v-model="formData.password_confirmation"
                id="password_confirmation"
                type="password"
                required
              />
            </div>

            <Button
              type="submit"
              class="w-full"
              :loading="formData.processing"
              :disabled="errors"
              @click="formData.post('/password/reset')"
            >
              {{ t('resetPassword.resetPassword') }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
