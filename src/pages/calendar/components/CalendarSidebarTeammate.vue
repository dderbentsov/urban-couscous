<template lang="pug">
  .flex.flex-col.items-center.gap-y-2.justify-center(v-if="!isOpen")
    base-button.mb-2(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary)
    .team-card(v-for="teammate in teamData" :key="teammate.id")
      base-avatar(:size="32", :color="teammate.color")
        img.h-full.object-cover(:src="url + teammate.photo", alt="Team member", v-if="teammate.photo")
        span(v-if="!teammate.photo") {{teammateAvatar(teammate)}}
  .flex.flex-col.gap-y-4.w-full(v-else, :style="{ color: 'var(--font-dark-blue-color)' }")
    .flex.items-center.justify-between
      .flex.text-base.font-bold Команды
      base-button(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary)
    .box-team.flex.flex-col.gap-y-2
      .team-card.flex.items-center.justify-between.cursor-pointer(
        v-for="teammate in teamData",
        :key="teammate.id"
      )
        .flex.items-center
          base-avatar(:size="32", :color="teammate.color")
            img.h-full.object-cover(:src="url + teammate.photo", alt="Team member", v-if="teammate.photo")
            span(v-if="!teammate.photo") {{teammateAvatar(teammate)}}
          .flex.ml-2.not-italic.font-medium.text-xxs {{ changeName(teammate.last_name, teammate.first_name, teammate.patronymic) }}
        span.icon-change-place.cursor-pointer.w-5.flex.items-center.justify-center.w-6.h-6
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import BaseAvatar from "@/components/base/BaseAvatar";
export default {
  name: "CalendarSidebarTeammate",
  props: {
    teamData: Array,
    isOpen: Boolean,
    url: String,
  },
  components: {
    BaseButton,
    BaseAvatar,
  },
  data() {
    return {
      maxLengthLastName: 13,
    };
  },
  methods: {
    changeName(lastName, firstName, patronymic) {
      let checkedFirstName = firstName !== null ? firstName[0] + "." : "";
      let checkedPatronymic = patronymic !== null ? patronymic[0] + "." : "";
      return lastName.length > this.maxLengthLastName
        ? lastName.slice(0, this.maxLengthLastName) +
            "... " +
            checkedFirstName +
            checkedPatronymic
        : lastName + " " + checkedFirstName + checkedPatronymic;
    },
    teammateAvatar(teammate) {
      let checkedFirstName =
        teammate.first_name !== null
          ? teammate.first_name[0]
          : teammate.last_name[1];
      return `${teammate.last_name[0]}${checkedFirstName}`;
    },
  },
};
</script>

<style lang="sass" scoped>
.team-card
  border-radius: 16px
  &:hover
    background: var(--font-dark-blue-color)
    color: var(--default-white)
</style>
