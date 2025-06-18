<script setup lang="ts">
import {
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  PlusIcon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-vue-next'

const { t } = useI18n()
const { user } = useUser()

const copied = ref(false)

const copyOrganizationSlug = async () => {
  if (user.value?.currentOrganization?.slug) {
    try {
      await navigator.clipboard.writeText(user.value.currentOrganization.slug)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy organization slug:', err)
    }
  }
}

const recentTournaments = [
  { name: 'Tournoi de Football', participants: 16, status: 'En cours' },
  { name: "Championnat d'Échecs", participants: 8, status: 'Terminé' },
  { name: 'Tournoi de Tennis', participants: 12, status: 'À venir' },
]

const stats = [
  { label: 'Tournois actifs', value: '3', icon: TrophyIcon, color: 'text-blue-600' },
  { label: 'Participants totaux', value: '127', icon: UsersIcon, color: 'text-green-600' },
  { label: 'Tournois terminés', value: '15', icon: CalendarIcon, color: 'text-purple-600' },
]
</script>

<template>
  <Head :title="t('dashboardPage.title')" />

  <div class="flex flex-col gap-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-foreground">
            {{ t('dashboardPage.welcome') }}, {{ user?.name }} ! 👋
          </h1>
          <p class="text-muted-foreground mt-2">
            {{ t('dashboardPage.manageTournaments') }}
            <strong>{{ user?.currentOrganization?.name }}</strong>
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Copy Organization Slug Button -->
          <Button variant="outline" @click="copyOrganizationSlug" class="flex items-center gap-2">
            <CheckIcon v-if="copied" class="size-4 text-green-600" />
            <ClipboardIcon v-else class="size-4" />
            {{ copied ? t('dashboardPage.copy') : t('dashboardPage.copyId') }}
          </Button>

          <!-- Create Tournament CTA -->
          <Button @click="router.get('/tournaments/create')" class="flex items-center gap-2">
            <PlusIcon class="size-4" />
            {{ t('dashboardPage.createTournament') }}
          </Button>
        </div>
      </div>
    </div>

    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card v-for="stat in stats" :key="stat.label" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
            </div>
            <div :class="`p-2 rounded-full bg-muted ${stat.color}`">
              <component :is="stat.icon" class="size-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div> -->

    <!-- Cards section -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card class="h-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <TrophyIcon class="size-5" />
            Tournois récents
          </CardTitle>
          <CardDescription> Vos derniers tournois créés </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="tournament in recentTournaments"
              :key="tournament.name"
              class="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrophyIcon class="size-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">{{ tournament.name }}</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ tournament.participants }} participants
                  </p>
                </div>
              </div>
              <Badge
                :variant="
                  tournament.status === 'En cours'
                    ? 'default'
                    : tournament.status === 'Terminé'
                      ? 'secondary'
                      : 'outline'
                "
              >
                {{ tournament.status }}
              </Badge>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t">
            <Button variant="outline" class="w-full" @click="router.get('/tournaments')">
              Voir tous les tournois
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card class="h-full">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription> Raccourcis pour les tâches courantes </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <Button
              variant="outline"
              class="h-auto p-4 flex flex-col items-center gap-2"
              @click="router.get('/tournaments/create')"
            >
              <PlusIcon class="size-6" />
              <span>Nouveau tournoi</span>
            </Button>

            <Button
              variant="outline"
              class="h-auto p-4 flex flex-col items-center gap-2"
              @click="router.get('/participants')"
            >
              <UsersIcon class="size-6" />
              <span>Gérer participants</span>
            </Button>

            <Button
              variant="outline"
              class="h-auto p-4 flex flex-col items-center gap-2"
              @click="router.get('/settings')"
            >
              <CalendarIcon class="size-6" />
              <span>Planifier événement</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card class="h-full">
        <CardHeader>
          <CardTitle>Informations de l'organisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Nom :</span>
              <span class="font-medium">{{ user?.currentOrganization?.name }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Identifiant :</span>
              <div class="flex items-center gap-2">
                <code class="bg-muted px-2 py-1 rounded text-sm">
                  {{ user?.currentOrganization?.slug }}
                </code>
                <Button variant="ghost" size="sm" @click="copyOrganizationSlug" class="h-8 w-8 p-0">
                  <CheckIcon v-if="copied" class="size-3 text-green-600" />
                  <ClipboardIcon v-else class="size-3" />
                </Button>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Créée le :</span>
              <span class="font-medium">
                {{ new Date(user?.currentOrganization?.createdAt || '').toLocaleDateString() }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div> -->
  </div>
</template>
