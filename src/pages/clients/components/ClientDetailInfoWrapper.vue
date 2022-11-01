<template lang="pug">
  .w-full.h-fit.pt-4.flex.gap-x-4(class="px-[52px] pb-[30px]")
    client-detail-info-section(v-model:section-info="dataDocument" section="pass")
    .flex.flex-col.gap-y-2
      client-detail-info-section(:section-info="dataAddress" section="addresses")
</template>

<script>
import ClientDetailInfoSection from "@/pages/clients/components/ClientDetailInfoSection";
export default {
  name: "ClientDetailInfoWrapper",
  components: { ClientDetailInfoSection },
  props: {
    dataDetail: Object,
    dataAddress: Object,
    saveNewDoc: Function,
    deleteDoc: Function,
    dataDocument: Object,
  },
};
</script>
