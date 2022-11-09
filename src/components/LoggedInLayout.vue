<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header(
      :is-open-page-form="isOpenPageForm",
      @is-open-header-form="changeHeaderFormState"
    )
    .flex.flex-auto
      the-sidebar
      router-view(
        :is-open-header-form="isOpenHeaderForm",
        @is-open-page-form="changePageFormState",
      )
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "LoggedInLayout",
  components: { TheHeader, TheSidebar },
  data() {
    return {
      isOpenPageForm: false,
      isOpenHeaderForm: false,
    };
  },
  methods: {
    changePageFormState(value) {
      this.isOpenPageForm = value;
    },
    changeHeaderFormState(value) {
      this.isOpenHeaderForm = value;
    },
  },
};
</script>
