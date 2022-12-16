<template lang="pug">
  .flex.flex-col.gap-y-3
    .flex.flex-col.gap-y-3.relative
      base-input.text-smm(placeholder="Заголовок", v-model:value="title", :maxLength="40")
      .text.flex.absolute.text-xsx.right-7.top-3 {{`${changeValue}/40`}}
    .input-wrapper.flex.gap-x-2.px-4.box-border.w-max-fit.text-smm(class="py-2.5")
      textarea.place-input.w-full.outline-0.not-italic.resize-none(
        :cols="24",
        placeholder="Описание",
        v-model="description"
      )
    .flex
      base-button(:size="40", @click="sendNote") Добавить
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableCreateNote",
  components: { BaseButton, BaseInput },
  props: {
    createNote: Function,
    closePopup: Function,
  },
  data() {
    return {
      username: "",
      title: "",
      description: "",
    };
  },
  computed: {
    changeValue() {
      return this.title.length;
    },
  },
  methods: {
    sendNote() {
      this.createNote(this.title, this.description);
      this.closePopup();
      this.title = "";
      this.description = "";
    },
  },
};
</script>

<style lang="sass" scoped>
.title
  min-height: 39px
.description
  min-height: 70px
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
  background-color: var(--default-white)
textarea
  overflow: hidden
.text
  color: var(--font-grey-color)
.button
  &:hover
    opacity: 0.7
</style>
