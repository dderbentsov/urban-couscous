<template lang="pug">
  img(:src="img", :height="height", :width="width")
</template>

<script>
import LoaderGif from "@/assets/images/loader.gif";

export default {
  name: "BaseLoader",
  props: {
    width: {
      type: Number,
      default: 64,
    },
    height: {
      type: Number,
      default: 64,
    },
  },
  data() {
    return {
      img: LoaderGif,
    };
  },
};
</script>

<style scoped></style>
