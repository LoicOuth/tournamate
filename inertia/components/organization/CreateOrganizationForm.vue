<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const emits = defineEmits(['close'])
const createOrganizationFormData = useForm({
  name: '',
})

const handleCreateNext = () => {
  createOrganizationFormData.post('/org/create', {
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
        {{ $t('createOrganizationForm.how_to_create.title') }}
      </h3>
      <p class="text-sm text-primary/80">
        {{ $t('createOrganizationForm.how_to_create.description') }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="org-name" class="text-sm font-medium">
        {{ $t('createOrganizationForm.organization_name_label') }}
      </Label>
      <Input
        id="org-name"
        v-model="createOrganizationFormData.name"
        :placeholder="$t('createOrganizationForm.organization_name_placeholder')"
        class="w-full"
      />
      <span v-if="createOrganizationFormData.errors.name" class="text-red-500 text-xs">
        {{ createOrganizationFormData.errors.name }}
      </span>
      <p v-else class="text-xs text-muted-foreground">
        {{ $t('createOrganizationForm.organization_name_help') }}
      </p>
    </div>

    <Button
      class="w-full"
      @click="handleCreateNext()"
      :disabled="!createOrganizationFormData.name.trim()"
      :loading="createOrganizationFormData.processing"
    >
      {{ $t('createOrganizationForm.submit_button') }}
      <ArrowRight class="w-4 h-4 ml-2" />
    </Button>
  </div>
</template>
