<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header(:is-open-create-client="isOpenCreateClient", @is-close-header-form="changeCloseHeaderForm")
    .flex.flex-auto
      the-sidebar
      router-view(@create-client="transmitOpenCreateClient", :is-close-header-form="isCloseHeaderForm")
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "LoggedInLayout",
  components: { TheHeader, TheSidebar },
  data() {
    return {
      isOpenCreateClient: false,
      isCloseHeaderForm: true,
    };
  },
  methods: {
    transmitOpenCreateClient(value) {
      this.isOpenCreateClient = value;
    },
    changeCloseHeaderForm(value) {
      this.isCloseHeaderForm = value;
    },
  },
};
</script>
