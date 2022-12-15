<template lang="pug">
  .w-full.h-fit.flex.gap-x-4
    client-detail-info-section(
      v-model:section-info="dataDocument",
      section="pass",
      :update-document="updateDocument",
      :lack-data="lackData",
      :create-document="createDocument",
      :doc-id="docId",
    )
    .flex.flex-col
      client-detail-info-section(
        :section-info="dataAddress",
        section="addresses",
        :update-address="updateAddress",
        :lack-address="lackAddress",
        :dope-address="dopeAddress",
        :create-address="createAddress",
        :address-id="addressId"
      )
    .flex.flex-col
      client-detail-info-section(
        :section-info="dataAttachments",
        section="docs",
        :save-new-doc="saveNewDoc",
        :delete-doc="deleteDoc"
        :lack-attachments="lackAttachments"
      )
    .flex.flex-col
      client-detail-info-section(
        section="additional",
        :section-info="dataNotes",
        :lack-notes="lackNotes",
        :create-note="createNote",
        :update-notes="updateNotes"
      )
</template>

<script>
import ClientDetailInfoSection from "@/pages/clients/components/ClientDetailInfoSection";
export default {
  name: "ClientDetailInfoWrapper",
  components: { ClientDetailInfoSection },
  props: {
    dataAddress: Object,
    dataAttachments: Array,
    dataNotes: Array,
    saveNewDoc: Function,
    createNote: Function,
    deleteDoc: Function,
    dataDocument: Object,
    updateDocument: Function,
    updateAddress: Function,
    updateNotes: Function,
    lackData: Boolean,
    lackAddress: Boolean,
    lackNotes: Boolean,
    lackAttachments: Boolean,
    dopeAddress: Object,
    createAddress: Function,
    createDocument: Function,
    addressId: String,
    docId: String,
  },
};
</script>
