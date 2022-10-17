<template lang="pug">
  .wrapper.flex.px-5.items-center.gap-x-2
    clients-action-button(v-for="data in (isSelectedOne?dataBtn:dataBtn.filter((el) => el.prompt !== 'ведение'))" :key="data.prompt" :img="data.img" :prompt="data.prompt")
</template>

<script>
import group from "@/assets/icons/group.svg";
import edit from "@/assets/icons/edit.svg";
import star from "@/assets/icons/star.svg";
import basket from "@/assets/icons/basket.svg";
import ClientsActionButton from "@/pages/clients/components/ClientsActionButton";
export default {
  name: "ClientsTableHeaderActions",
  components: { ClientsActionButton },
  props: {
    isSelectedOne: Boolean,
  },
  data() {
    return {
      dataBtn: [
        {
          img: group,
          prompt: "сгрупировать",
        },
        {
          img: edit,
          prompt: "редактировать",
        },
        {
          img: star,
          prompt: "ведение",
        },
        {
          img: basket,
          prompt: "удалить",
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  border-radius: 22px
  background-color: #EFF1FF
.button
  border-radius: 50%
  &:hover
    background-color: rgba(71, 114, 242, 0.15)
</style>
