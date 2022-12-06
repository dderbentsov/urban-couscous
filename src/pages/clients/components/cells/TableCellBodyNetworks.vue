<template lang="pug">
  .network-cell.flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    .flex.gap-x-1
      .text-xl.icon.relative(
        v-for="network in getNetworks",
        :class="settings.settings.find((el) => el.network === network.kind)?.icon || ''"
      )
        .absolute.icon-cancel-mini.delete.flex.w-4.h-4.justify-center.items-center.bottom-4.left-2(
          v-if="isOpenChange",
          :id="network.kind",
          @click="(e) => deleteNetwork(e)"
        )
    .flex.relative.pb-2(class="pl-[46px]")
      base-button(
        v-if="isOpenChange && settings.settings.length !== getNetworks.length",
        @click.stop="openPopupAdding",
        :rounded="true",
        :outlined="true",
        :added="true",
        :size="24"
      )
        .icon-plus(class="pt-[2px]")
      base-popup.right-3.top-6(v-if="isOpenPopupAdding", v-click-outside="closePopup" :width="485")
        base-adding-network(
          :value="network",
          :selected-option="getSelectedIcon",
          :list-adding-networks="getAddingNetworks",
          :choose-network="chooseNetwork"
        )
        .w-fit
          base-button(:size="40", @click="saveNetwork")
            span.font-semibold Добавить
</template>

<script>
import BaseAddingNetwork from "@/components/base/BaseAddingNetwork";
import BasePopup from "@/components/base/BasePopup";
import BaseButton from "@/components/base/BaseButton";
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "TableCellBodyNetworks",
  components: {
    BasePopup,
    BaseAddingNetwork,
    BaseButton,
  },
  props: {
    networks: {
      default: [
        {
          kind: "TELEGRAM",
          username: "",
        },
      ],
    },
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
    getNetworks() {
      return this.networks.filter(
        (el) => el.kind !== "EMAIL" && el.kind !== "PHONE"
      );
    },
    getSelectedIcon() {
      return this.settings.settings.find(
        (el) => el.network === this.network.kind
      ).icon;
    },
    getAddingNetworks() {
      let kinds = this.networks.map((el) => el.kind);
      return this.settings.settings.filter((el) => !kinds.includes(el.network));
    },
  },
  methods: {
    chooseNetwork(e) {
      this.network.kind = e.target.id;
    },
    closePopup() {
      this.isOpenPopupAdding = false;
    },
    saveNetwork() {
      this.addNetwork(this.network);
      this.isOpenPopupAdding = false;
      this.network = {
        kind: "TELEGRAM",
        username: "",
      };
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
