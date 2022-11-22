<template lang="pug">
  .flex.flex-col.gap-y-3
    .button.keep-redaction.flex.items-center.gap-x-2
      img(:src="docIcon")
      span.text-smm Создать пакет документов
    .button.keep-redaction.flex.items-center.gap-x-3
      img(:src="manyDocIcon")
      span.text-smm Добавить документы
</template>

<script>
import docIcon from "@/assets/icons/doc.svg";
import manyDocIcon from "@/assets/icons/manyDoc.svg";

export default {
  name: "TableChoiceAddingDoc",
  data() {
    return {
      docIcon,
      manyDocIcon,
    };
  },
};
</script>

<style lang="sass" scoped>
.keep-redaction
  color: var(--font-dark-blue-color)

.button
  &:hover
    opacity: 0.7
</style>
