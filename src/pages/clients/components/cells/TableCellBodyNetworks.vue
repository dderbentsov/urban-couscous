<template lang="pug">
  .network-cell.flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    .flex.gap-x-1
      .text-xl.icon.relative(v-for="network in getNetworks" :class="settings.settings.find((el) => el.network === network.kind).icon")
        .absolute.icon-cancel-mini.delete.flex.w-4.h-4.justify-center.items-center.bottom-4.left-2(v-if="isOpenChange" :id="network.kind" @click="(e) => deleteNetwork(e)")
    .flex.relative
      base-button-plus.ml-3(v-if="isOpenChange && settings.settings.length !== getNetworks.length" :with-border="true" @click="openPopupAdding")
      base-popup.right-3.top-6(v-if="isOpenPopupAdding" :width="485")
        base-adding-network(:value="network" :selected-option="getSelectedIcon" :list-adding-networks="getAddingNetworks" :choose-network="chooseNetwork")
        base-create-button(text="Добавить" @click="saveNetwork")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BaseAddingNetwork from "@/components/base/BaseAddingNetwork";
import BasePopup from "@/components/base/BasePopup";
import BaseButtonPlus from "@/components/base/buttons/BaseButtonPlus";
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "TableCellBodyNetworks",
  components: {
    BaseButtonPlus,
    BasePopup,
    BaseAddingNetwork,
    BaseCreateButton,
  },
  props: {
    networks: Array,
    width: Number,
    isOpenChange: Boolean,
    deleteNetwork: Function,
    addNetwork: Function,
  },
  data() {
    return {
      isOpenPopupAdding: false,
      network: {
        kind: "TELEGRAM",
        username: "",
      },
      settings: column.find((el) => el.name === "networks"),
    };
  },
  computed: {
    getSelectedIcon() {
      return this.settings.settings.find(
        (el) => el.network === this.network.kind
      ).icon;
    },
    getAddingNetworks() {
      let kinds = this.networks.map((el) => el.kind);
      return this.settings.settings.filter((el) => !kinds.includes(el.network));
    },
    getNetworks() {
      return this.networks.filter(
        (el) => el.kind !== "EMAIL" && el.kind !== "PHONE"
      );
    },
  },
  methods: {
    chooseNetwork(e) {
      this.network.kind = e.target.id;
    },
    saveNetwork() {
      this.addNetwork(this.network);
      this.isOpenPopupAdding = false;
    },
    openPopupAdding() {
      this.isOpenPopupAdding = true;
    },
  },
};
</script>

<style lang="sass" scoped>
.network-cell
  column-gap: 2px
.icon
  color: var(--btn-blue-color)
.delete
  border-radius: 50%
  background-color: var(--btn-red-color)
  color: var(--default-white)
  font-size: 8px
</style>
