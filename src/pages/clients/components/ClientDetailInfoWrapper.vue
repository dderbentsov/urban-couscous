<template lang="pug">
  .w-full.h-fit.pt-4.flex.gap-x-4(class="px-[52px] pb-[30px]")
    client-detail-info-section(
      v-model:section-info="dataDocument"
      section="pass"
      :update-document="updateDocument"
      :lack-data="lackData"
      :create-document="createDocument"
    )
    .flex.flex-col
      client-detail-info-section(
        :section-info="dataAddress"
        section="addresses"
        :update-address="updateAddress"
        :lack-address="lackAddress"
        :dope-address="dopeAddress"
        :create-address="createAddress"
      )
    .flex.flex-col
      client-detail-info-section(
        :section-info="dataAttachments"
        section="docs"
        :save-new-doc="saveNewDoc"
        :delete-doc="deleteDoc"
      )
</template>

<script>
import ClientDetailInfoSection from "@/pages/clients/components/ClientDetailInfoSection";
export default {
  name: "ClientDetailInfoWrapper",
  components: { ClientDetailInfoSection },
  props: {
    dataDetail: Object,
    dataAddress: Object,
    dataAttachments: Array,
    saveNewDoc: Function,
    deleteDoc: Function,
    dataDocument: Object,
    updateDocument: Function,
    updateAddress: Function,
    lackData: Boolean,
    lackAddress: Boolean,
    dopeAddress: Object,
    createAddress: Function,
    createDocument: Function,
  },
};
</script>
