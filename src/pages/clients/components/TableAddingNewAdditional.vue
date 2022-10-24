<template lang="pug">
  .flex.absolute.flex-col.items-end.right-3.top-5
    .corner
    .wrap.flex.flex-col.p-4.gap-y-4
      .flex.flex-col.gap-y-1
        base-input(:with-icon="true" v-model:value="newAdditionalData.header" icon-position="right" :max-length="140" placeholder="Заголовок")
          span.counter {{`${newAdditionalData.header.length}/140`}}
        .description.flex.px-4.py-3
          textarea.w-full.h-full.outline-0.resize-none(:value="newAdditionalData.value" @input="$emit('update:newAdditionalData.value', $event.target.value)" placeholder="Описание" style="py-10")
      .place.flex.flex-col.justify-center.items-center.py-3
        .upload.text-center.text-sm.flex.w-fit
          input.hidden(@change="(e) => addNewAdditional(e)" type="file" id="file-upload")
          span Загрузите элемент
            label.label.cursor-pointer(for="file-upload")  с компьютера
            span  или перетащите их сюда
      base-create-button(text="Добавить" @click="saveAdditional")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableAddingNewAdditional",
  components: { BaseInput, BaseCreateButton },
  props: {
    addNewAdditional: Function,
    saveAdditional: Function,
    newAdditionalData: Object,
  },
};
</script>

<style lang="sass" scoped>
.wrap
  width: 485px
  height: fit-content
  background-color: var(--default-white)
  border-radius: 8px 0 8px 8px
  box-shadow: var(--default-shadow)
.corner
  width: 8px
  height: 8px
  border-top-left-radius: 100%
  background-color: var(--default-white)
  z-index: 2
  overflow: hidden
.place
  width: 100%
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
  color: var(--font-grey-color)
.upload
  width: 240px
.name-doc
  border-radius: 4px
  background-color: var(--border-light-grey-color-1)
  width: fit-content
.description
  min-height: 77px
  border-radius: 4px
  border: 2px solid var(--border-light-grey-color)
.label
  color: var(--btn-blue-color)
.counter
  color: var(--font-grey-color)
</style>
