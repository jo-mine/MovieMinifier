<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { hc } from "hono/client"
import type { BackendApp } from "@apps/backend"
const client = hc<BackendApp>("http://localhost:3100")
client.index.$get().then((res) => {
  console.log("Response from backend:", res)
})
</script>
