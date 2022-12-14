<template lang="pug">
  .schedule.mx-2.pb-22px(
    ref="schedule",
    :style="scheduleWidth"
  )
    calendar-header(
      :current-date="currentDate",
      :is-current-date="isCurrentDate",
      @previous-date="previousDate",
      @next-date="nextDate",
      @selected-layout="selectedLayout"
    )
    .schedule-body(
      @scroll="changeScrollingState",
      ref="scheduleBody"
    )
      .hiding-container.fixed(v-if="isScrolling")
      .column-wrapper.flex.ml-20(:style="columnWrapperWidth")
        calendar-column(
          v-for="(owner, index) in filteredOwners",
          :key="owner.id",
          :owner-data="owner",
          :url="url",
          :day-events="filterEventsByOwner(owner)",
          :day-start-time="validateStartTime",
          :day-end-time="validateEndTime",
          :style="columnSize",
          :event-statuses="eventStatuses",
          :change-form-was-closed="changeFormWasClosed",
          @selected-event="transmitEventData",
          @reset-change-form="transmitResetChangeForm",
          @delete-event="transmitDeleteEvent",
          :schedule-body-ref="$refs.scheduleBody",
          :open-form-create-event="openFormCreateEvent",
          :current-date="currentDate"
        )
      .flex.w-full.relative
        .time-coil-wrapper.left-0.-mt-12.pt-9
          calendar-clock-column(
            :timeCoil="timeCoil",
            :current-time="currentTime",
            :is-current-date="isCurrentDate",
            :day-end-time="validateEndTime"
          )
          .time-circle-indicator.left-74px(
            v-if="isShownIndicator",
            :style="circleIndicatorLocation"
          )  
        span.time-line-indicator.block.left-20(
          v-if="isShownIndicator",
          :style="lineIndicatorLocation"
        )
        .flex(:class="calendarBackgroundWidth")
          calendar-background(
            :time-coil="timeCoil",
            :owners-count="ownersCount"
          )
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarBackground from "./CalendarBackground.vue";
import CalendarClockColumn from "./CalendarClockColumn.vue";
import CalendarColumn from "./CalendarColumn.vue";
export default {
  name: "CalendarSchedule",
  components: {
    CalendarHeader,
    CalendarBackground,
    CalendarClockColumn,
    CalendarColumn,
  },
  props: {
    openFormCreateEvent: Function,
    url: String,
    changeFormWasClosed: Boolean,
    currentDate: {
      type: Object,
      default() {
        return {};
      },
    },
    timeInformation: {
      type: Object,
      default() {
        return {};
      },
    },
    eventsData: {
      type: Array,
      default() {
        return [];
      },
    },
    sidebarWidth: String,
    ownersData: {
      type: Array,
      default() {
        return [];
      },
    },
    eventStatuses: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentTime: "",
      timeCoil: [],
      timer: null,
      isCurrentDate: true,
      isShownIndicator: true,
      pixelsPerHour: 62,
      columnHeaderHeight: 48,
      defaultColumnWidth: 470,
      isScrolling: false,
    };
  },
  computed: {
    hours() {
      return this.convertTime(this.currentTime, 0, -6);
    },
    minutes() {
      return this.convertTime(this.currentTime, 3, -3);
    },
    hoursMinutes() {
      return this.currentTime.slice(0, -3);
    },
    validateStartTime() {
      return this.verifyTime(this.timeInformation.dayStartTime);
    },
    validateEndTime() {
      return this.verifyTime(this.timeInformation.dayEndTime);
    },
    lineIndicatorLocation() {
      if (this.ownersCount > 3) {
        return {
          width: `${this.defaultColumnWidth * this.ownersCount}px`,
          top: `${this.calculateIndicatorLocation()}px`,
        };
      }
      return {
        width: "calc(100% - 80px)",
        top: `${this.calculateIndicatorLocation()}px`,
      };
    },
    circleIndicatorLocation() {
      return {
        top: `${this.calculateIndicatorLocation() + 42}px`,
      };
    },
    pixelsPerMinute() {
      return this.pixelsPerHour / 60;
    },
    scheduleHeight() {
      return (
        (this.validateEndTime - this.validateStartTime) * this.pixelsPerHour
      );
    },
    scheduleWidth() {
      return {
        "--sidebar-width": this.sidebarWidth,
      };
    },
    filteredOwners() {
      let filteredArray = [];
      this.ownersData.forEach((elem) => {
        filteredArray.push({
          id: elem.id,
          last_name: elem.last_name,
          first_name: elem.first_name,
          patronymic: elem.patronymic,
          color: elem.color,
          photo: elem.photo,
        });
      });
      return filteredArray;
    },
    ownersCount() {
      return this.filteredOwners.length;
    },
    filteredEventsByDate() {
      return this.eventsData.filter(
        ({ start }) =>
          start.slice(0, 10) === this.currentDate.format("YYYY-MM-DD")
      );
    },
    columnHeight() {
      return (
        (this.timeCoil.length - 1) * this.pixelsPerHour +
        this.columnHeaderHeight
      );
    },
    columnSize() {
      if (this.ownersCount > 3) {
        return {
          height: `${this.columnHeight}px`,
          width: `${this.defaultColumnWidth}px`,
        };
      }
      return {
        height: `${this.columnHeight}px`,
        width: `calc(100% / ${this.ownersCount})`,
      };
    },
    columnWrapperWidth() {
      if (this.ownersCount > 3) {
        return {
          width: `${this.defaultColumnWidth * this.ownersCount}px`,
        };
      }
      return {
        width: "calc(100% - 80px)",
      };
    },
    calendarBackgroundWidth() {
      return {
        "w-full": this.ownersCount <= 3,
      };
    },
  },
  methods: {
    previousDate() {
      this.$emit("previous-date");
    },
    nextDate() {
      this.$emit("next-date");
    },
    selectedLayout(option) {
      this.$emit("selected-layout", option);
    },
    startTimer() {
      if (
        this.hours >= this.validateStartTime &&
        this.hours < this.validateEndTime
      ) {
        this.timer = setInterval(() => {
          this.changeCurrentTime();
          this.changeTimeCoil();
        }, 5000);
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    changeCurrentTime() {
      this.currentTime = moment().format("HH:mm:ss");
    },
    timeCoilInitialization() {
      this.timeCoil = [];
      for (let i = this.validateStartTime; i <= this.validateEndTime; i++) {
        if (
          i === this.hours &&
          this.hours !== this.validateEndTime &&
          this.isCurrentDate
        ) {
          this.timeCoil.push(this.hoursMinutes);
        } else this.timeCoil.push(`${i}:00`);
      }
    },
    changeTimeCoil() {
      this.timeCoil = this.timeCoil.map((elem) => {
        if (this.convertTime(elem, 0, -3) === this.hours) {
          return this.hoursMinutes;
        }
        return elem.slice(0, -3) + ":00";
      });
    },
    verifyTime(dayTime) {
      let timeArray = dayTime.split(":").map((elem) => parseInt(elem, 10));
      let newTime = timeArray[1] > 30 ? timeArray[0] + 1 : timeArray[0];
      return newTime;
    },
    convertTime(str, startIndex, endIndex) {
      return parseInt(str.slice(startIndex, endIndex), 10);
    },
    calculateIndicatorLocation() {
      let newTime = this.currentTime
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let result =
        (newTime[0] - this.validateStartTime) * this.pixelsPerHour +
        newTime[1] * this.pixelsPerMinute;
      if (result > this.scheduleHeight || result < 0) {
        this.isShownIndicator = false;
        return 0;
      }
      return result;
    },
    findObjectInArray(array, object) {
      return array.find(
        (item) => JSON.stringify(item) === JSON.stringify(object)
      );
    },
    filterEventsByOwner(owner) {
      let filteredArray = [];
      this.filteredEventsByDate.forEach((item) => {
        let foundEvent = item.employees.find(
          (elem) =>
            JSON.stringify(elem.employee) === JSON.stringify(owner) &&
            elem.role === "owner"
        );
        if (foundEvent) filteredArray.push(item);
      });
      return filteredArray;
    },
    changeScrollingState(e) {
      this.isScrolling = e.target.scrollTop !== 0;
    },
    showCuttentTime() {
      this.$nextTick(() =>
        this.$refs["scheduleBody"].scrollTo({
          top: `${this.lineIndicatorLocation.top.slice(0, -2) - 240}`,
          behavior: "smooth",
        })
      );
    },
    transmitResetChangeForm() {
      this.$emit("reset-change-form");
    },
    transmitEventData(eventData) {
      this.$emit("selected-event", eventData);
    },
    transmitDeleteEvent(eventData) {
      this.$emit("delete-event", eventData);
    },
    bodyScroll() {
      this.$nextTick(() => {
        let presenceScroll =
          this.$refs["scheduleBody"].scrollHeight !==
          this.$refs["scheduleBody"].clientHeight;
        if (presenceScroll) {
          this.$refs["scheduleBody"].classList.add("pr-10px");
          this.$refs["schedule"].classList.add("pr-10px");
        }
      });
    },
  },
  watch: {
    currentTime() {
      if (
        this.hours === this.validateEndTime &&
        this.minutes > 0 &&
        this.timer
      ) {
        this.stopTimer();
        this.timeCoilInitialization();
      }
    },
    currentDate: function () {
      this.isCurrentDate =
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
      this.isShownIndicator = this.isCurrentDate;
      if (this.timer) {
        this.stopTimer();
        this.timeCoilInitialization();
      }
      if (this.isCurrentDate) {
        this.changeCurrentTime();
        this.timeCoilInitialization();
        this.startTimer();
        this.showCuttentTime();
      }
    },
  },
  mounted() {
    this.changeCurrentTime();
    this.timeCoilInitialization();
    this.startTimer();
    this.showCuttentTime();
    this.bodyScroll();
  },
  beforeUnmount() {
    this.stopTimer();
  },
};
</script>

<style lang="sass" scoped>
.schedule
  border-top-left-radius: 4px
  border-top-right-radius: 4px
  position: relative
  background-color: var(--default-white)
  width: calc(100% - (var(--sidebar-width) + 16px))
  height: calc(100vh - 56px - 8px)

.time-line-indicator
  border-top: 1px solid var(--bg-event-red-color)
  position: absolute
  z-index: 4

.time-circle-indicator
  width: 12px
  height: 12px
  background-color: var(--bg-event-red-color)
  border-radius: 50%
  position: absolute
  z-index: 5

.column-wrapper
  position: relative
  height: 48px
  background-color: var(--default-white)

.time-coil-wrapper
  position: sticky
  z-index: 5
  background-color: var(--default-white)

.schedule-body
  width: 100%
  height: calc(100vh - 56px * 2 - 8px - 22px)
  overflow-y: auto
  overflow-x: auto
  &::-webkit-scrollbar-track:horizontal
    margin: 0 24px 0 104px
  &::-webkit-scrollbar-track:vertical
    margin: 48px 0 24px 0

.hiding-container
  width: 80px
  height: 48px
  top: calc(56px * 2 + 8px)
  background-color: var(--default-white)
  z-index: 6
</style>
