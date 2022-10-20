export const column = [
  {
    name: "checkbox",
    iconHead: false,
    width: 36,
  },
  {
    name: "fullName",
    title: "ФИО",
    iconHead: true,
    width: 400,
  },
  {
    name: "age",
    title: "Возраст",
    iconHead: true,
    width: 140,
  },
  {
    name: "jobTitle",
    title: "Должность",
    iconHead: false,
    width: 200,
  },
  {
    name: "priority",
    title: "Приоритет",
    iconHead: true,
    width: 124,
  },
  {
    name: "phone",
    title: "Телефон",
    iconHead: false,
    width: 170,
  },
  {
    name: "email",
    title: "Email",
    iconHead: false,
    width: 250,
  },
  {
    name: "networks",
    title: "Сети",
    iconHead: false,
    width: 152,
  },
  {
    name: "meeting",
    title: "Ближайшая встреча",
    iconHead: true,
    width: 220,
  },
  {
    name: "dots",
    title: "Do",
    iconHead: false,
    width: 53,
  },
];

export const detail = [
  {
    name: "pass",
    title: "Паспортные данные",
    options: {
      number: "Серия и номер",
      issuedBy: "Выдан",
      divisionCode: "Код подразделения",
      dateIssue: "Дата выдачи",
    },
    width: 280,
  },
  {
    name: "snils",
    title: "СНИЛС",
    options: {
      number: "Номер",
    },
    width: 180,
  },
  {
    name: "inn",
    title: "ИНН",
    options: {
      number: "Номер",
    },
    width: 180,
  },
  {
    name: "birthday",
    title: "Дата рождения",
    width: 292,
    rollFlex: true,
  },
  {
    name: "addresses",
    title: "Адреса",
    options: {
      registrationPlace: "Адрес постоянной регистрации",
      actualPlace: "Адрес фактического проживания",
    },
    width: 292,
  },
  {
    name: "docs",
    title: "Документы",
    height: 280,
    width: 360,
  },
  {
    name: "additional",
    title: "Дополнительные данные",
    height: 280,
    width: 360,
  },
];
