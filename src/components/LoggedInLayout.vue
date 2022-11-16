<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header(:is-open-form="isOpenForm", :close-form="closeForm", :open-form="openForm")
    .flex.flex-auto
      the-sidebar
      router-view(:open-form="openForm")
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "LoggedInLayout",
  components: { TheHeader, TheSidebar },
  data() {
    return {
      isOpenForm: false,
    };
  },
  methods: {
    openForm() {
      this.isOpenForm = true;
    },
    closeForm() {
      this.isOpenForm = false;
    },
  },
};
</script>
