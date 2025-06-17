<script setup lang="ts">
import Logo from '~/assets/images/logo.png'

const { t } = useI18n()
const { user } = useUser()

const sports = [
  { name: t('home.sports.football'), icon: '⚽', color: 'bg-green-500/20' },
  { name: t('home.sports.chess'), icon: '♟️', color: 'bg-slate-700/20' },
  { name: t('home.sports.petanque'), icon: '🎯', color: 'bg-orange-500/20' },
  { name: t('home.sports.esport'), icon: '🎮', color: 'bg-purple-500/20' },
  { name: t('home.sports.tennis'), icon: '🎾', color: 'bg-yellow-500/20' },
  { name: t('home.sports.basketball'), icon: '🏀', color: 'bg-orange-600/20' },
]

const features = [
  {
    title: t('home.features.creation.title'),
    description: t('home.features.creation.description'),
    icon: '🚀',
  },
  {
    title: t('home.features.multisports.title'),
    description: t('home.features.multisports.description'),
    icon: '🏆',
  },
  {
    title: t('home.features.realtime.title'),
    description: t('home.features.realtime.description'),
    icon: '📊',
  },
  {
    title: t('home.features.participants.title'),
    description: t('home.features.participants.description'),
    icon: '👥',
  },
]

const toFeatureSection = () => {
  const section = document.getElementById('features')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <Head :title="t('home.title')" />

  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10"
    >
      <div class="container mx-auto px-4 py-20 lg:py-28">
        <div class="text-center max-w-4xl mx-auto">
          <div class="flex flex-col justify-center items-center mb-8">
            <img :src="Logo" alt="logo" class="h-24 w-24 mr-4" />
            <h1
              class="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight"
            >
              {{ t('home.hero.title') }}
            </h1>
          </div>

          <p class="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {{ t('home.hero.subtitle') }}
            <span class="text-primary font-semibold">{{ t('home.hero.subtitle_highlight') }}</span>
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="huge" @click="router.get(`/org/${user?.lastOrganizationAccessed?.slug}`)">
              {{ t('home.hero.cta_primary') }}
            </Button>
            <Button size="huge" variant="outline" @click="toFeatureSection()">
              {{ t('home.hero.cta_secondary') }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Floating sports icons -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 animate-bounce delay-100">⚽</div>
        <div class="absolute top-32 right-20 animate-bounce delay-300">🏀</div>
        <div class="absolute bottom-40 left-20 animate-bounce delay-500">🎾</div>
        <div class="absolute bottom-20 right-10 animate-bounce delay-700">♟️</div>
      </div>
    </section>

    <!-- Sports Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          {{ t('home.sports.title') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div
            v-for="sport in sports"
            :key="sport.name"
            class="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow border"
          >
            <div
              :class="`w-16 h-16 ${sport.color} rounded-full flex items-center justify-center text-2xl mb-3`"
            >
              {{ sport.icon }}
            </div>
            <span class="text-sm font-medium text-center">{{ sport.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20" id="features">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('home.features.title') }}</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            {{ t('home.features.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow border"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">1,000+</div>
            <div class="text-lg opacity-90">{{ t('home.stats.tournaments') }}</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
            <div class="text-lg opacity-90">{{ t('home.stats.participants') }}</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">25+</div>
            <div class="text-lg opacity-90">{{ t('home.stats.sports') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          {{ t('home.cta.title') }}
        </h2>
        <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {{ t('home.cta.subtitle') }}
        </p>
        <Button
          size="huge"
          class="mb-4"
          @click="router.get(`/org/${user?.lastOrganizationAccessed?.slug}`)"
        >
          {{ t('home.cta.button') }}
        </Button>
      </div>
    </section>
  </div>
</template>
