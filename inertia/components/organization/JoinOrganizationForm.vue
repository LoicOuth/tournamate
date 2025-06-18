<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const emits = defineEmits(['close'])
const joinOrganizationFormData = useForm({
  slug: '',
})

const handleJoinNext = () => {
  joinOrganizationFormData.post('/org/join', {
    onSuccess: () => {
      emits('close')
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <h3 class="font-medium text-primary mb-2">
        {{ $t('joinOrganizationForm.how_to_join.title') }}
      </h3>
      <p class="text-sm text-primary/80">
        {{ $t('joinOrganizationForm.how_to_join.description') }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="org-id" class="text-sm font-medium">
        {{ $t('joinOrganizationForm.organization_id_label') }}
      </Label>
      <Input
        id="org-id"
        v-model="joinOrganizationFormData.slug"
        :placeholder="$t('joinOrganizationForm.organization_id_placeholder')"
        class="w-full"
        required
      />
      <span v-if="joinOrganizationFormData.errors.slug" class="text-red-500 text-xs">
        {{ joinOrganizationFormData.errors.slug }}
      </span>
      <p v-else class="text-xs text-muted-foreground">
        {{ $t('joinOrganizationForm.organization_id_help') }}
      </p>
    </div>

    <Button
      class="w-full"
      @click="handleJoinNext()"
      :disabled="!joinOrganizationFormData.slug.trim()"
      :loading="joinOrganizationFormData.processing"
    >
      {{ $t('joinOrganizationForm.submit_button') }}
      <ArrowRight class="w-4 h-4 ml-2" />
    </Button>
  </div>
</template>
