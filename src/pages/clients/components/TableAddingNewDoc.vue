<template lang="pug">
  .wrap.flex.flex-col.gap-y-4
    .flex.flex-col.gap-y-2
      .place.flex.flex-col.justify-center.items-center.py-8
        .w-60.text-center.text-sm.flex.w-fit
          input.hidden(@change="(e) => addNewDoc(e)", type="file", id="file-upload", multiple)
          span Загрузите документ
            label.label.cursor-pointer(for="file-upload")  с компьютера
            span  или перетащите его в это поле
      .flex.flex-col
        span.name-doc.py-2.px-3(v-for="doc in newDocs") {{doc.name}}
    base-button(@click="closeModal", :size="40", :style="{width: '124px'}")
      span.font-semibold Добавить
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "TableAddingNewDoc",
  components: { BaseButton },
  props: {
    addNewDoc: Function,
    newDocs: Array,
    closeModal: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrap
  width: 485px
  height: fit-content

.place
  width: 100%
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
  color: var(--font-grey-color)

.name-doc
  border-radius: 4px
  background-color: var(--border-light-grey-color-1)
  width: fit-content

.label
  color: var(--btn-blue-color)
</style>
