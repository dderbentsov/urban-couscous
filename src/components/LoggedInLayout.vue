<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header
    .flex.flex-auto
      the-sidebar
      router-view
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "LoggedInLayout",
  components: { TheHeader, TheSidebar },
};
</script>
