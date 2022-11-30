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
    name: "priority",
    title: "Приоритет",
    settings: [
      {
        priority: 1,
        id: "1",
        text: "Высокий",
        color: "#FF6F6F",
      },
      {
        priority: 2,
        id: "2",
        text: "Средний",
        color: "#FFC75B",
      },
      {
        priority: 3,
        id: "3",
        text: "Низкий",
        color: "#81ACFF",
      },
      {
        priority: null,
        id: "4",
        text: "-",
        color: "#9294A7",
      },
    ],
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
    settings: [
      {
        network: "VK",
        icon: "icon-vk",
      },
      {
        network: "TELEGRAM",
        icon: "icon-tg",
      },
      {
        network: "GOOGLE",
        icon: "icon-google",
      },
      {
        network: "SLACK",
        icon: "icon-slack",
      },
      {
        network: "DISCORD",
        icon: "icon-discord",
      },
      {
        network: "VIBER",
        icon: "icon-mail",
      },
      {
        network: "WHATS_APP",
        icon: "icon-mail",
      },
    ],
    iconHead: false,
    width: 152,
  },
  {
    name: "dots",
    title: "Do",
    iconHead: false,
    width: 53,
  },
];

export const detail = {
  pass: {
    title: "Паспортные данные",
    options: {
      numba: "Серия и номер",
      issued_by_org: "Выдан",
      issued_by_org_code: "Код подразделения",
      issued_by_date: "Дата выдачи",
    },
    sharps: {
      numba: "#### ######",
      issued_by_org: "",
      issued_by_org_code: "###-###",
      issued_by_date: "##.##.####",
    },
    placeholder: {
      numba: "0000 000000",
      issued_by_org: "Точно как в паспорте",
      issued_by_org_code: "000-000",
      issued_by_date: "Дата",
    },
    width: 280,
  },
  snils: {
    title: "СНИЛС",
    options: {
      numba: "Номер",
    },
    placeholder: {
      numba: "000-000-000 00",
    },
    width: 180,
  },
  inn: {
    title: "ИНН",
    options: {
      numba: "Номер",
    },
    placeholder: {
      numba: "000000000000",
    },
    width: 180,
  },
  birthday: {
    title: "Дата рождения",
    width: 292,
    rowFlex: true,
  },
  addresses: {
    title: "Адреса",
    options: {
      join_adress: "Полный адрес",
    },
    sharps: { join_adress: "" },
    placeholder: {
      join_adress: "Введите адрес целиком",
    },
    width: 292,
  },
  docs: {
    title: "Документы",
    height: 280,
    width: 360,
    addFile: true,
  },
  additional: {
    title: "Дополнительные данные",
    height: 280,
    width: 360,
    addFile: true,
  },
  docsColor: {
    "application/pdf": "#ff6969",
    "application/msword": "#6993ff",
    "application/vnd.ms-excel": "#61c57d",
  },
};
