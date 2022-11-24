<template lang="pug">
  .flex.flex-col.gap-y-3
    .button.flex.items-center.gap-x-2(
      :style="{color: 'var(--font-dark-blue-color)'}"
    )
      img(:src="docIcon")
      .text-smm(@click="changeOpenAddDoc") Создать пакет документов
    .button.keep-redaction.flex.items-center.gap-x-3
      img(:src="manyDocIcon")
      .text-smm(@click="changeOpenCreateDoc") Добавить документы
</template>

<script>
import docIcon from "@/assets/icons/doc.svg";
import manyDocIcon from "@/assets/icons/manyDoc.svg";

export default {
  name: "TableChoiceAddingDoc",
  props: { changeOpenAddDoc: Function, changeOpenCreateDoc: Function },
  data() {
    return {
      docIcon,
      manyDocIcon,
    };
  },
};
</script>

<style lang="sass" scoped>
.button
  &:hover
    opacity: 0.7
</style>
