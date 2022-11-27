import { reactive } from "vue";

export const notifications = reactive({});

export const addNotification = (id, title, message, type, lifeTime = 0) => {
  notifications[id] = {
    title,
    message,
    type,
    lifeTime,
  };
};

export const deleteNotification = (id) => {
  delete notifications[id];
};
