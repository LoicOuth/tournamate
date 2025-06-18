<script setup lang="ts">
import NavLink from '~/components/layouts/app.layout/NavLink.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
// import Notification from '~/components/shared/Notification.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import Logo from '~/assets/images/logo.png'
import { BuildingIcon, ChevronUp, PlusIcon, SquareArrowDown } from 'lucide-vue-next'
import CreateOrganizationForm from '~/components/organization/CreateOrganizationForm.vue'
import JoinOrganizationForm from '~/components/organization/JoinOrganizationForm.vue'

const { t } = useI18n()
const { user } = useUser()

const opened = ref(true)
const isCreateOrganizationModalDisplayed = ref(false)
const isJoinOrganizationModalDisplayed = ref(false)

const availableOrganizations = computed(() => {
  return (
    user.value?.organizations.filter((org) => org.id !== user.value?.currentOrganization?.id) || []
  )
})
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
                  :href="`/org/${user?.lastOrganizationAccessed?.slug}`"
                  icon="LayoutDashboard"
                  :text="t('appLayout.dashboard')"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{{ t('appLayout.tournaments') }}</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu :modal="false">
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton class="cursor-pointer">
                    <BuildingIcon />
                    {{ user?.currentOrganization?.name }}
                    <ChevronUp class="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" class="w-60">
                  <DropdownMenuItem @click="isCreateOrganizationModalDisplayed = true">
                    <PlusIcon class="size-5" />
                    <span class="ml-2">{{ t('appLayout.createOrganization') }}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="isJoinOrganizationModalDisplayed = true">
                    <SquareArrowDown class="size-5" />
                    <span class="ml-2">{{ t('appLayout.joinOrganization') }}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator v-if="availableOrganizations.length" />
                  <DropdownMenuItem
                    v-for="org in availableOrganizations"
                    :key="org.id"
                    @click="router.get(`/org/${org.slug}`)"
                  >
                    <span>{{ org.name }}</span>
                  </DropdownMenuItem>
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
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </SidebarProvider>

    <Dialog v-model:open="isCreateOrganizationModalDisplayed">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ t('appLayout.createOrganization') }}</DialogTitle>
        </DialogHeader>
        <CreateOrganizationForm @close="isCreateOrganizationModalDisplayed = false" />
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isJoinOrganizationModalDisplayed">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ t('appLayout.joinOrganization') }}</DialogTitle>
        </DialogHeader>
        <JoinOrganizationForm @close="isJoinOrganizationModalDisplayed = false" />
      </DialogContent>
    </Dialog>
  </MainLayout>
</template>
