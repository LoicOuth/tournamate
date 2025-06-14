<script setup lang="ts">
import MainLayout from '~/layouts/Main.layout.vue'
import Logo from '~/assets/images/logo.png'

const { t } = useI18n()

const currentTab = computed({
  set: (value: string | number) => {
    router.visit(value.toString())
  },

  get: () => usePage().url.split('/')[1],
})
</script>

<template>
  <MainLayout>
    <div class="flex min-h-screen justify-center items-center bg-background">
      <div class="flex flex-col items-center gap-10">
        <div class="flex items-center">
          <img :src="Logo" alt="Logo" class="h-16 w-16 mr-2" />
          <h1 class="text-3xl font-bold">{{ t('publicLayout.title') }}</h1>
        </div>
        <Tabs v-model="currentTab" class="w-[500px]">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="login"> {{ t('authLayout.signIn') }} </TabsTrigger>
            <TabsTrigger value="register"> {{ t('authLayout.register') }} </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{{ t('authLayout.signIn') }}</CardTitle>
                <CardDescription>
                  {{ t('authLayout.signInDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <slot />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>{{ t('authLayout.register') }}</CardTitle>
                <CardDescription>
                  {{ t('authLayout.registerDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <slot />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </MainLayout>
</template>
