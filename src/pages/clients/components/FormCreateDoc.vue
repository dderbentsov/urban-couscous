<template lang="pug">
  .wrapper-doc.flex.flex-col.justify-between
    .upload-wrapper.flex.flex-col.justify-center.items-center
      .upload-text.text-center.flex.w-fit
        input.hidden(@change="(e) => saveFile(e)" type="file" id="file-upload")
        span Загрузите элемент
          label.label.cursor-pointer(for="file-upload")  с комьютера
          span  или перетащите их сюда
    base-create-button(@click="saveClient" text="Создать клиента")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
export default {
  name: "FormCreateDoc",
  components: { BaseCreateButton },
  props: {
    saveClient: Function,
    saveFile: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-doc
  min-height: 443px
  max-height: 443px
  overflow-y: auto
  color: var(--font-grey-color)
.upload-wrapper
  min-height: 92px
  max-height: 92px
  width: 100%
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
.upload-text
  max-width: 278px
.label
  color: var(--btn-blue-color)
</style>
