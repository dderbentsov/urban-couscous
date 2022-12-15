<template lang="pug">
  .wrap.flex.flex-col.gap-y-6
    .flex.flex.flex-col.gap-y-9
      span.text-center.font-bold.text-xl Создание медицинской карты стоматологического пациента
      .flex.justify-center.items-center.gap-x-2
        base-button.button(:size="32", :rounded="true")
          span(v-if="isBaseData") 1
          .icon-ok.text-xs(v-else)
        span(:style="{color: 'var(--btn-blue-color)'}") Основное
        .line.flex.mx-2
        base-button.button(:class="{'active-button': !isIdentityDoc && isBaseData}", :size="32", :rounded="true")
          span(v-if="isBaseData") 2
          .icon-ok.text-xs(v-else)
        span(:style="{color: !isBaseData ? 'var(--btn-blue-color)' : 'var(--font-dark-blue-color)' }") ДУЛ
        .line.flex.mx-2
        base-button.button(:class="{'active-button': !isPolicyDoc }", :size="32", :rounded="true") 3
        span(:style="{color: isPolicyDoc ? 'var(--btn-blue-color)' : 'var(--font-dark-blue-color)' }") Полис
    medical-base-data(v-if="isBaseData", :change-base-data="changeBaseData")
    medical-identity-documents(v-if="isIdentityDoc", :change-identity-doc="changeIdentityDoc")
    medical-policy-documents(v-if="isPolicyDoc")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
import MedicalBaseData from "@/pages/medicalCard/components/MedicalBaseData";
import MedicalIdentityDocuments from "@/pages/medicalCard/components/MedicalIdentityDocuments";
import MedicalPolicyDocuments from "@/pages/medicalCard/components/MedicalPolicyDocuments";

export default {
  name: "FormCreateMedicalCard",
  components: {
    BaseInput,
    BaseButton,
    BaseInputDate,
    BaseSelect,
    MedicalBaseData,
    MedicalIdentityDocuments,
    MedicalPolicyDocuments,
  },
  data() {
    return {
      isBaseData: true,
      isIdentityDoc: false,
      isPolicyDoc: false,
    };
  },
  methods: {
    changeBaseData() {
      this.isBaseData = !this.isBaseData;
      this.isIdentityDoc = !this.isIdentityDoc;
    },
    changeIdentityDoc() {
      this.isIdentityDoc = !this.isIdentityDoc;
      this.isPolicyDoc = !this.isPolicyDoc;
    },
  },
};
</script>

<style lang="sass" scoped>
.wrap
  width: 570px
  height: fit-content
  min-height: 485px

.services-wrapper
  border: 1px solid var(--btn-grey-color)
  border-radius: 8px

.list-services
  overflow-y: auto
  max-height: 280px

.input-date
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.button
  &:hover
    background-color: var(--btn-blue-color)
    border: none

.active-button
  background: var(--btn-grey-color)
  color: var(--font-dark-blue-color)
  border-color: var(--btn-grey-color)
  &:hover
    background-color: var(--btn-grey-color)
    border: none

.line
  width: 78px
  border: 1.5px solid var(--btn-grey-color)

.place
  width: 100%
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
  color: var(--font-grey-color)

.counter
  color: var(--font-grey-color)
</style>
