<template lang="pug">
  .wrap.flex.flex-col.gap-y-6
    .flex.flex.flex-col.gap-y-9
      span.text-center.font-bold.text-xl Создание медицинской карты стоматологического пациента
      .flex.justify-center.items-center.gap-x-2
        base-button.button(:size="32", :rounded="true")
          span(v-if="!isServices") 1
          .icon-ok.text-xs(v-else)
        span(:style="{color: 'var(--btn-blue-color)'}") Основное
        .line.flex.mx-2
        base-button.button(:class="{'active-button': !isServices}", :size="32", :rounded="true") 2
        span(:style="{color: isServices ? 'var(--btn-blue-color)' : 'var(--font-dark-blue-color)' }") Услуги
    medical-base-data(v-if="!isServices")
    .services.flex.flex-col.gap-y-6(v-else)
      .flex.flex-col.gap-y-6
        .flex.flex-col.gap-y-2
          .font-bold Услуги
          .counter.text-smm Выберите подходищие из списка
        .services-wrapper.flex.flex-col.pt-4.px-4
          .flex.gap-x-2
            base-input(
              :with-icon="true",
              icon-position="left",
              :width-input="310",
              placeholder="Поиск"
            )
              .counter.icon-search
            base-select.h-10(placeholder="Вид услуги")
          .flex.items-center.px-11px.py-9px(
            :style="{borderBottom: '1px solid var(--btn-grey-color)'}"
          )
            .flex.items-center.gap-x-3
              input.counter.w-4.h-4.checkbox.cursor-pointer(
                type="checkbox",
                @click="selectAll",
                v-model="isAllServices"
              )
              .counter.flex.p-2(:style="{width: '358px'}") Название услуги
            .counter Вид услуги
          .list-services.flex.flex-col.px-11px.py-9px
            .flex.items-center(v-for="service in services", :key="service.id")
              .flex.items-center.gap-x-3
                input.w-4.h-4.checkbox.cursor-pointer(
                  type="checkbox",
                  v-model="userIds",
                  :value="service.id"
                )
                .flex.p-2(:style="{width: '358px'}") {{service.name}}
              .counter {{service.type}}
  base-button.custom-button(
    v-if="!isServices",
    :size="40",
    @click="changeServices"
  )
    span.font-semibold Далее
  base-button.custom-button(:size="40", v-else)
    span.font-semibold Создать медицинскую карту
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
import MedicalBaseData from "@/pages/medicalCard/components/MedicalBaseData";
export default {
  name: "FormCreateMedicalCard",
  components: {
    BaseInput,
    BaseButton,
    BaseInputDate,
    BaseSelect,
    MedicalBaseData,
  },
  data() {
    return {
      isServices: false,
      isAllServices: false,
      userIds: [],
    };
  },
  methods: {
    changeServices() {
      this.isServices = !this.isServices;
    },
    selectAll() {
      this.userIds = [];
      if (!this.isAllServices) {
        this.services.forEach((el) => this.userIds.push(el.id));
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.wrap
  width: 570px
  height: fit-content
  min-height: 640px

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
