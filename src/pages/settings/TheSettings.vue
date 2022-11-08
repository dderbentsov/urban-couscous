<template lang="pug">
  div
    v-select(:items="items", placeholder="Выберите значение", v-model="value" )
    BaseButton(@click="showModal = true") Открыть модалку
    base-modal(v-model="showModal", title="Тестовый заголовок окна" )
</template>

<script>
import VSelect from "@/components/base/BaseSelect";
import BaseModal from "@/components/base/BaseModal";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "TheSettings",
  components: { BaseButton, BaseModal, VSelect },
  data() {
    return {
      items: [
        {
          id: "1",
          label: "12312312",
        },
        {
          id: "2",
          label: "123123afsdfasdf12",
        },
        {
          id: "3",
          label: "123fasvcbxcvbxcvbxcvbxcvdfasdfasdfasdfasd12312",
        },
      ],
      value: "",
      showModal: false,
    };
  },
};
</script>
