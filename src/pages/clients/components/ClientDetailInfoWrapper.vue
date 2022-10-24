<template lang="pug">
  .w-full.h-fit.pt-4.flex.gap-x-4(class="px-[52px] pb-[30px]")
    client-detail-info-section(v-model:section-info="dataDetail.pass" section="pass")
    .flex.flex-col.gap-y-2
      client-detail-info-section(:section-info="dataDetail.snils" section="snils" )
      client-detail-info-section(:section-info="dataDetail.inn" section="inn" )
    .flex.flex-col.gap-y-2
      client-detail-info-section(:section-info="dataDetail.birthday" section="birthday")
      client-detail-info-section(:section-info="dataDetail.addresses" section="addresses")
    client-detail-info-section(:section-info="dataDetail.docs" section="docs" :save-new-doc="saveNewDoc" :delete-doc="deleteDoc")
    client-detail-info-section(:section-info="dataDetail.additional" section="additional" :save-new-doc="saveNewDoc" :delete-doc="deleteDoc")
</template>

<script>
import ClientDetailInfoSection from "@/pages/clients/components/ClientDetailInfoSection";
export default {
  name: "ClientDetailInfoWrapper",
  components: { ClientDetailInfoSection },
  props: {
    dataDetail: Object,
    saveNewDoc: Function,
    deleteDoc: Function,
  },
};
</script>

<style lang="sass" scoped></style>
