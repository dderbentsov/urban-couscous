export const clickOutside = {
  mounted: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent, { capture: true });
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent, {
      capture: true,
    });
  },
};
