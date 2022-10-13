<template lang="pug">
    div {{persons["person"]}}
</template>

<script>
/* eslint-disable */

export default {
  name: "TheCalendar",
  data() {
    return {
      persons: { person: "dasda"},
    };
  },
  methods: {
    savePersons(data) {
      console.log(data)
      this.persons = data
    },
  },
  mounted() {
    fetch("https://afae35de-056c-4544-96a5-07f01c158778.mock.pstmn.io/urban")
        .then((res) => res.json())
        .then((data) => this.savePersons(data))
  },
};
</script>
,
