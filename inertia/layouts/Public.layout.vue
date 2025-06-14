<script setup lang="ts">
import { LogInIcon } from 'lucide-vue-next'
// import Notification from '~/components/shared/Notification.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'
// import NavLink from '~/components/layouts/public.layout/NavLink.vue'
import Logo from '~/assets/images/logo.png'
import Me from '~/assets/images/me.jpg'

const { t } = useI18n()
// const { mdAndDown, mdAndUp } = useScreenMediaQuery()
const { user } = useUser()

// const isOpen = ref(false)
</script>

<template>
  <MainLayout>
    <div vaul-drawer-wrapper class="flex min-h-screen flex-col bg-background">
      <header class="sticky z-40 top-5 right-0 left-0 flex justify-center px-5">
        <div
          class="flex max-w-(--breakpoint-xl) items-center bg-background/60 backdrop-blur-lg border shadow-sm px-8 py-4 rounded-lg w-full"
        >
          <!-- <Sheet v-if="mdAndDown" v-model:open="isOpen">
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon">
                <MenuIcon class="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader class="text-left">
                <SheetTitle> Logo </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet> -->

          <div class="flex items-center cursor-pointer" @click="router.get('/')">
            <img :src="Logo" alt="Logo" class="h-10 w-10 mr-2" />
            <h1 class="text-xl font-bold">{{ t('publicLayout.title') }}</h1>
          </div>

          <div class="flex-1" />

          <div class="flex items-center gap-7">
            <!-- <NavLink route="home.index" :text="t('publicLayout.home')" />
              <NavLink route="about.index" :text="t('publicLayout.about')" /> -->
          </div>

          <div class="flex-1" />

          <div class="flex items-center space-x-2 justify-end">
            <ThemeToggle />
            <!-- <Notification v-if="user" /> -->
            <UserMenu v-if="user" />
            <Button v-else as-child size="lg">
              <Link as="a" href="/login">
                <LogInIcon :size="20" />
                <span>{{ t('publicLayout.signIn') }}</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div class="flex-1 bg-background">
        <main class="mx-auto max-w-(--breakpoint-xl) px-1">
          <slot />
        </main>
      </div>
      <footer class="border-t border lg:py-8 py-5 px-5 ,x">
        <div
          class="flex lg:items-center items-start lg:flex-row flex-col lg:gap-20 gap-10 mx-auto max-w-(--breakpoint-xl)"
        >
          <div class="flex-1 flex-col">
            <div class="flex items-center">
              <img :src="Logo" alt="Logo" class="h-10 w-10 mr-2" />
              <h1 class="text-2xl font-bold">{{ t('publicLayout.title') }}</h1>
            </div>
            <a
              href="https://www.linkedin.com/in/loic-outhier/"
              class="flex items-center gap-5 flex-wrap mt-3 -ml-2"
              target="_blank"
            >
              <div
                class="rounded-full bg-gray-400/10 px-3 py-2 cursor-pointer flex items-center gap-2 hover:translate-y-2 duration-300 transition-transform"
              >
                <img :src="Me" class="h-10 w-10 rounded-full" />
                <div class="font-medium">{{ t('publicLayout.createdBy') }} Loïc OUTHIER</div>
              </div>
            </a>
          </div>
          <div class="flex items-center gap-40">
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.navigation') }}</h2>
              <Link
                href="/"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.home') }}
              </Link>
            </div>
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.informations') }}</h2>
              <Link
                href="/"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.privacyPolicy') }}
              </Link>
              <Link
                href="/"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.termsOfService') }}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </MainLayout>
</template>
