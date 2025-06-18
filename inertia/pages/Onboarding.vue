<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Building2, Users } from 'lucide-vue-next'
import Logo from '~/assets/images/logo.png'
import CreateOrganizationForm from '~/components/organization/CreateOrganizationForm.vue'
import JoinOrganizationForm from '~/components/organization/JoinOrganizationForm.vue'

const currentStep = ref<'selection' | 'join' | 'create'>('selection')

const goBack = () => {
  currentStep.value = 'selection'
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Logo Header -->
    <header class="p-6">
      <div class="flex items-center">
        <div class="flex items-center space-x-2">
          <img :src="Logo" alt="TournaMate Logo" class="w-10 h-10" />
          <span class="text-xl font-semibold">TournaMate</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex justify-center p-6">
      <div class="w-full max-w-2xl">
        <!-- Selection Step -->
        <div v-if="currentStep === 'selection'" class="space-y-8">
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold">{{ $t('onboarding.welcome_title') }} TournaMate</h1>
            <p class="text-lg text-muted-foreground max-w-lg mx-auto">
              {{ $t('onboarding.welcome_description') }}
            </p>
          </div>

          <!-- Organization Explanation -->
          <Card class="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle class="flex items-center space-x-2 text-primary">
                <Building2 class="w-5 h-5" />
                <span>{{ $t('onboarding.organization_explanation.title') }}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-primary/80">
                {{ $t('onboarding.organization_explanation.description') }}
              </p>
            </CardContent>
          </Card>

          <!-- Choice Cards -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Join Organization Card -->
            <Card
              class="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
              @click="currentStep = 'join'"
            >
              <CardHeader class="text-center">
                <div
                  class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Users class="w-6 h-6 text-primary" />
                </div>
                <CardTitle class="text-xl">{{ $t('onboarding.join_card.title') }}</CardTitle>
                <CardDescription class="text-muted-foreground">
                  {{ $t('onboarding.join_card.subtitle') }}
                </CardDescription>
              </CardHeader>
              <CardContent class="text-center">
                <p class="text-sm text-muted-foreground mb-4">
                  {{ $t('onboarding.join_card.description') }}
                </p>
                <Button class="w-full" variant="outline">
                  {{ $t('onboarding.join_card.button') }}
                  <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <!-- Create Organization Card -->
            <Card
              class="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
              @click="currentStep = 'create'"
            >
              <CardHeader class="text-center">
                <div
                  class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Building2 class="w-6 h-6 text-primary" />
                </div>
                <CardTitle class="text-xl">{{ $t('onboarding.create_card.title') }}</CardTitle>
                <CardDescription class="text-muted-foreground">
                  {{ $t('onboarding.create_card.subtitle') }}
                </CardDescription>
              </CardHeader>
              <CardContent class="text-center">
                <p class="text-sm text-muted-foreground mb-4">
                  {{ $t('onboarding.create_card.description') }}
                </p>
                <Button class="w-full">
                  {{ $t('onboarding.create_card.button') }}
                  <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Join Organization Step -->
        <div v-else-if="currentStep === 'join'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" @click="goBack()">
              <ArrowLeft class="w-4 h-4 mr-2" />
              {{ $t('onboarding.back_button') }}
            </Button>
          </div>

          <Card>
            <CardHeader class="text-center">
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Users class="w-6 h-6 text-primary" />
              </div>
              <CardTitle class="text-2xl">{{ $t('onboarding.join_step.title') }}</CardTitle>
              <CardDescription>
                {{ $t('onboarding.join_step.subtitle') }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JoinOrganizationForm />
            </CardContent>
          </Card>
        </div>

        <!-- Create Organization Step -->
        <div v-else-if="currentStep === 'create'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" @click="goBack()">
              <ArrowLeft class="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <Card>
            <CardHeader class="text-center">
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Building2 class="w-6 h-6 text-primary" />
              </div>
              <CardTitle class="text-2xl">{{ $t('onboarding.create_step.title') }}</CardTitle>
              <CardDescription>
                {{ $t('onboarding.create_step.subtitle') }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateOrganizationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
