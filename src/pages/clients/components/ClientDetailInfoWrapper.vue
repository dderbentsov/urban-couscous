<template lang="pug">
  .w-full.h-fit.pt-4.flex.gap-x-4(class="px-[52px] pb-[30px]")
    client-detail-info-section(:section-info="dataDetail.pass" section="pass")
    .flex.flex-col.gap-y-2
      client-detail-info-section(:section-info="dataDetail.snils" section="snils" )
      client-detail-info-section(:section-info="dataDetail.inn" section="inn" )
    .flex.flex-col.gap-y-2
      client-detail-info-section(:section-info="dataDetail.birthday" section="birthday")
      client-detail-info-section(:section-info="dataDetail.addresses" section="addresses")
</template>

<script>
import ClientDetailInfoSection from "@/pages/clients/components/ClientDetailInfoSection";
export default {
  name: "ClientDetailInfoWrapper",
  components: { ClientDetailInfoSection },
  props: {
    dataDetail: Object,
  },
};
</script>

<style lang="sass" scoped></style>
