<template lang="pug">
  div
    v-select(:items="items", placeholder="Выберите значение", v-model="value" )
</template>

<script>
import VSelect from "@/components/base/BaseSelect";
export default {
  name: "TheSettings",
  components: { VSelect },
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
    };
  },
};
</script>
