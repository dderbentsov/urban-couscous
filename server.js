import { createServer } from "miragejs";

const dataClients = [
  {
    id: "1",
    fullName: "Вильгейльм Арнольд Витальевич",
    age: "34",
    jobTitle: "Менеджер",
    priority: "Высокий",
    phone: "+7 (915) 657–21–14",
    email: "Superboyband@yandex.ru",
    networks: [],
    meeting: {
      date: "02.06.22",
      time: "18:30–19:30",
    },
  },
  {
    id: "2",
    fullName: "Астафоркина Екатерина Геннадьевна",
    age: "54",
    jobTitle: "Менеджер",
    priority: "-",
    phone: "+7 (574) 364–53–36",
    email: "antimag@gmail.com",
    networks: [],
    meeting: {
      date: "14.07.22",
      time: "17:30–21:30",
    },
  },
];

const clientsDetail = [
  {
    id: "5",
    idClient: "1",
    pass: {
      number: {
        value: "5261 918732",
        copy: true,
      },
      issuedBy: {
        value: "Отделом УФМС России по рязанской области",
      },
      divisionCode: {
        value: "426–234",
      },
      dateIssue: {
        value: "02.04.2022",
      },
    },
    snils: {
      number: {
        value: "812–183–139 21",
        copy: true,
      },
    },
    inn: {
      number: {
        value: "138291382731",
        copy: true,
      },
    },
    birthday: {
      date: {
        value: "21.04.1999",
      },
    },
    addresses: {
      registrationPlace: {
        value:
          "371311, Московская обл., г. Москва, ул. Комсомольская, д.6, кв. 13",
      },
      actualPlace: {
        value:
          "371311, Московская обл., г. Москва, ул. Комсомольская, д.6, кв. 13",
      },
    },
    docs: {
      info: [
        {
          value: "Договор оферты.pdf",
        },
        {
          value: "Договор о долевом строительстве.pdf",
        },
        {
          value: "Какое-то очень очень очень очень длинное название.doc",
        },
        {
          value: "Договор об оплате.doc",
        },
        {
          value: "Коммерческое предложение.xls",
        },
        {
          value: "Таблица заказов.xls",
        },
      ],
    },
    additional: {
      info: [
        {
          name: "Предпочтения",
          value: "Разговор на “Вы”\nТолько по делу\nТолько официальный стиль",
          file: "",
        },
        {
          name: "Доп.документы",
          value: "",
          file: "Памятка с вопросами на созвоне.pdf",
        },
        {
          name: "Его должность",
          value: "Вроде бы важная шишка, пусть будет – Гуру в дизайне",
          file: "",
        },
        {
          name: "Чтобы не забыть",
          value: "Не забудь!",
          file: "",
        },
      ],
    },
  },
];
export function clientsServer() {
  createServer({
    routes() {
      this.get("/api/clients", () => ({
        dataClients,
      }));
      this.get("/registry/event/", () => ({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: "6faa6bb6-1de6-422c-a401-1b35cd455303",
            start: "2022-10-20T20:23:49Z",
            end: "2022-10-20T21:23:53Z",
            kind: "call",
            subkind: null,
            description: "",
            location: null,
            members: [
              {
                id: "b0509f9a-e824-4bb3-a260-2b32dae9bc81",
                person: {
                  id: "14ff401c-2b7b-4d9a-9159-720c74d8b23c",
                  last_name: "Гагарин",
                  first_name: "Юрий",
                  patronymic: "Алексеевич",
                },
                role: null,
              },
            ],
            employees: [
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db831a14-e836-481f-a653-6325de7c311e",
                  last_name: "Жмыхов",
                  first_name: "Егор",
                  patronymic: "Сергеевич",
                },
                role: "owner",
              },
            ],
          },
        ],
      }));
      this.passthrough("http://45.84.227.122:8080/**");
      this.get("/api/detail/:id", (schema, request) => {
        let id = request.params.id;
        return clientsDetail.find((el) => el.idClient === id);
      });
    },
  });
}
