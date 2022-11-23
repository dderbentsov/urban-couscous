<template lang="pug">
  .wrap.flex.flex-col.gap-y-6
    .flex.flex.flex-col.gap-y-9
      span.font-bold.text-xl Создание пакета документов
      .flex.justify-center.items-center.gap-x-2
        base-button(:size="32", :rounded="true")
          span(v-if="!isServices") 1
          .icon-ok.text-xs(v-else)
        span(:style="{color: 'var(--btn-blue-color)'}") Основное
        .line.flex.mx-2
        base-button(:class="{'active-button': !isServices}", :size="32", :rounded="true") 2
        span(:style="{color: isServices ? 'var(--btn-blue-color)' : 'var(--font-dark-blue-color)' }") Услуги
    .base.flex.flex-col.gap-y-6(v-if="!isServices")
      .flex.flex-col.gap-y-6
        span.font-bold Основное
        .flex.flex-col(class="gap-y-1.5")
          .counter.font-semibold.text-smm Название пакета
          base-input(v-model:value="packageDocs.packageName", placeholder="Введите название для пакета документов")
            span.counter 
        .flex.gap-x-4
          .flex.flex-col.w-full(class="gap-y-1.5")
            .counter.font-semibold.text-smm Тип документа
            base-select.h-10(placeholder="Выберите тип")
          .flex.flex-col(class="gap-y-1.5")
            .counter.font-semibold.text-smm Дата подписания
            .input-date.flex.h-10.justify-center
              base-input-date(:width-input="277")
      .flex.flex-col.gap-y-6
        span.font-bold Дополнительное
        .flex.flex-col.mb-124px(class="gap-y-1.5")
          .counter.font-semibold.text-smm Риски
          base-select.h-10(placeholder="Выберите риски")
    .services.flex.flex-col.gap-y-6(v-else)
      .flex.flex-col.gap-y-6
        .flex.flex-col.gap-y-2
          .font-bold Услуги
          .counter.text-smm Выберите подходищие из списка
        .services-wrapper.flex.flex-col.pt-4.px-4
          .flex.gap-x-2
            base-input(:with-icon="true", icon-position="left", :width-input="310", placeholder="Поиск")
              .counter.icon-search
            base-select.h-10(placeholder="Вид услуги")
          .flex.items-center.px-11px.py-9px(:style="{borderBottom: '1px solid var(--btn-grey-color)'}")
            .flex.items-center.gap-x-3
              input.counter.w-4.h-4.checkbox.cursor-pointer(type="checkbox")
              .counter.flex.p-2(:style="{width: '358px'}") Название услуги
            .counter Вид услуги
          .list-services.flex.flex-col.px-11px.py-9px
            .flex.items-center(v-for="service in services", :key="service.id")
              .flex.items-center.gap-x-3
                input.w-4.h-4.checkbox.cursor-pointer(type="checkbox")
                .flex.p-2(:style="{width: '358px'}") {{service.name}}
              .counter {{service.type}}
  base-button.custom-button(v-if="!isServices", :disabled="disabledButton", :size="40", @click="changeServices")
    span.font-semibold Далее
  base-button.custom-button(:size="40", v-else)
    span.font-semibold Создать пакет документов
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "TableCreatePackageDoc",
  components: { BaseInput, BaseButton, BaseInputDate, BaseSelect },
  data() {
    return {
      isServices: false,
      packageDocs: {
        packageName: "",
      },
      services: [
        { id: 1, name: "Создание сайта", type: "Разработка" },
        {
          id: 2,
          name: "Цифровая реконструкция приложения",
          type: "Поддержка",
        },
        { id: 3, name: "Маркетинговое ведение", type: "Маркетинг" },
        {
          id: 4,
          name: "Создание дополнительного контента",
          type: "Разработка",
        },
        { id: 5, name: "Продвижение в соцсетях", type: "ССМ" },
        { id: 6, name: "Продвижение в соцсетях", type: "ССМ" },
        { id: 7, name: "Продвижение в соцсетях", type: "ССМ" },
        { id: 8, name: "Продвижение в соцсетях", type: "ССМ" },
        { id: 9, name: "Продвижение в соцсетях", type: "ССМ" },
        { id: 10, name: "Продвижение в соцсетях", type: "ССМ" },
      ],
    };
  },
  computed: {
    disabledButton() {
      return this.packageDocs.packageName ? false : true;
    },
  },
  methods: {
    changeServices() {
      this.isServices = !this.isServices;
    },
  },
};
</script>

<style lang="sass" scoped>
.wrap
  width: 570px
  height: fit-content
  min-height: 700px

.services-wrapper
  border: 1px solid var(--btn-grey-color)
  border-radius: 8px

.list-services
  overflow-y: auto
  max-height: 280px

.input-date
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.active-button
  background: var(--btn-grey-color)
  color: var(--font-dark-blue-color)
  border-color: var(--btn-grey-color)

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
