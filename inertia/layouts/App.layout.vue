<script setup lang="ts">
import NavLink from '~/components/layouts/app.layout/NavLink.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
// import Notification from '~/components/shared/Notification.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import Logo from '~/assets/images/logo.png'
import { BuildingIcon, ChevronUp } from 'lucide-vue-next'

const { t } = useI18n()
const { user } = useUser()

const opened = ref(false)
</script>

<template>
  <MainLayout>
    <SidebarProvider :open="opened">
      <Sidebar collapsible="icon">
        <SidebarHeader class="h-16">
          <div class="flex items-center mt-2">
            <img :src="Logo" alt="Logo" class="h-8 w-8" />
            <h1 v-if="opened" class="text-xl font-bold ml-2">{{ t('publicLayout.title') }}</h1>
          </div>
        </SidebarHeader>

        <SidebarContent class="mt-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavLink
                  :href="`/org/${user?.firstOrganization?.slug}`"
                  icon="LayoutDashboard"
                  text="Tableau de bord"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tournois</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <BuildingIcon />
                    Current Organization
                    <ChevronUp class="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
                  <!-- organizations -->
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div class="flex flex-col w-full">
        <header class="w-full bg-sidebar px-5 py-2 h-16 flex items-center justify-between border-b">
          <SidebarTrigger class="size-8" @click="opened = !opened" />
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <!-- <Notification /> -->
            <UserMenu :from-dashboard="true" />
          </div>
        </header>
        <main class="flex-1 p-5">
          <slot />
        </main>
      </div>
    </SidebarProvider>
  </MainLayout>
</template>
