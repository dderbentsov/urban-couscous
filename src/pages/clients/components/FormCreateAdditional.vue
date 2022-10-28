<template lang="pug">
  .wrapper-additional.flex.flex-col.gap-y-8.justify-between.text-base
    .flex.flex-col.gap-y-6.w-full.px-4
      .flex.flex-col.gap-y-4.w-full(v-for="info in additionalInfo" :key="info.id")
        .flex.flex-col.gap-y-1
          base-input(v-model:value="info.header" placeholder="Заголовок")
          .flex.px-4.py-3.description
            textarea.w-full.h-full.outline-0.resize-none(:value="info.description" @input="$emit('update:info.description', $event.target.value)" placeholder="Описание" style="py-10")
        .upload-wrapper.flex.flex-col.justify-center.items-center
          .upload-text.text-center.flex.w-fit
            input.hidden(@change="(e) => saveFile(e)" type="file" :id="info.id")
            span Загрузите элемент
              label.label.cursor-pointer(:for="info.id")  с комьютера
              span  или перетащите их сюда
      .add-additional.flex.gap-x-3.cursor-pointer(@click="addNewAdditional")
        .icon-plus
        span Добавить еще пункт
    .px-4
      base-create-button(@click="saveClient" text="Создать клиента")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
export default {
  name: "FormCreateAdditional",
  components: { BaseCreateButton, BaseInput },
  props: {
    additionalInfo: Object,
    saveClient: Function,
    addNewAdditional: Function,
    saveFile: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-additional
  min-height: 443px
  max-height: 443px
  overflow-y: auto
  color: var(--font-dark-blue-color)
  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-track
    background-color: rgba(211, 212, 220, 0.5)
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    border-radius: 8px
    background-color: var(--btn-blue-color)
.upload-wrapper
  min-height: 92px
  max-height: 92px
  width: 100%
  color: var(--font-grey-color)
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
.upload-text
  max-width: 278px
.label
  color: var(--btn-blue-color)
.description
  min-height: 77px
  border-radius: 4px
  border: 2px solid var(--border-light-grey-color)
.add-additional
  color: var(--btn-blue-color)
</style>
