import { createServer } from "miragejs";

const dataClients = [
  {
    id: "1",
    last_name: "Вильгейльм",
    first_name: "Арнольд",
    patronymic: "Витальевич",
    identity_document_to_person: {
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
    },
    note_to_person: {
      basic_info: {
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
      additional_info: {
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
        docs: [
          {
            name: "Договор оферты.pdf",
            type: "application/pdf",
          },
          {
            name: "Договор о долевом строительстве.pdf",
            type: "application/pdf",
          },
          {
            name: "Какое-то очень очень очень очень длинное название.doc",
            type: "application/msword",
          },
          {
            name: "Договор об оплате.doc",
            type: "application/msword",
          },
          {
            name: "Коммерческое предложение.xls",
            type: "application/vnd.ms-excel",
          },
          {
            name: "Таблица заказов.xls",
            type: "application/vnd.ms-excel",
          },
        ],
        additional: [
          {
            header: "Предпочтения",
            value: "Разговор на “Вы”\nТолько по делу\nТолько официальный стиль",
            name: "",
            type: "",
          },
          {
            header: "Доп.документы",
            value: "",
            name: "Памятка с вопросами на созвоне.pdf",
            type: "application/pdf",
          },
          {
            header: "Его должность",
            value: "Вроде бы важная шишка, пусть будет – Гуру в дизайне",
            name: "",
            type: "",
          },
          {
            header: "Чтобы не забыть",
            value: "Не забудь!",
            name: "",
            type: "",
          },
        ],
      },
    },
  },
  {
    id: "2",
    last_name: "Астафоркина",
    first_name: "Екатерина",
    patronymic: "Геннадьевна",
    identity_document_to_person: {
      pass: {
        number: {
          value: "1324 103496",
          copy: true,
        },
        issuedBy: {
          value: "Отделом УФМС России по владимирской области",
        },
        divisionCode: {
          value: "675–901",
        },
        dateIssue: {
          value: "01.01.2011",
        },
      },
    },
    note_to_person: {
      basic_info: {
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
      additional_info: {
        snils: {
          number: {
            value: "834–001–555 35",
            copy: true,
          },
        },
        inn: {
          number: {
            value: "371942327342",
            copy: true,
          },
        },
        birthday: {
          date: {
            value: "07.12.1993",
          },
        },
        addresses: {
          registrationPlace: {
            value:
              "371311, Московская обл., г. Владимир, ул. Гагарина, д.12, кв. 24",
          },
          actualPlace: {
            value:
              "371311, Московская обл., г. Владимир, ул. Гагарина, д.12, кв. 24",
          },
        },
        docs: [
          {
            name: "Договор покупки.pdf",
            type: "application/pdf",
          },
          {
            name: "Договор о оптовых поставках.pdf",
            type: "application/pdf",
          },
          {
            name: "Договор о предоставлении услуг.pdf",
            type: "application/pdf",
          },
          {
            name: "Какое-то очень очень очень очень короткое название.doc",
            type: "application/msword",
          },
          {
            name: "Документация.doc",
            type: "application/msword",
          },
          {
            name: "Отчет.xls",
            type: "application/vnd.ms-excel",
          },
          {
            name: "Заказы.xls",
            type: "application/vnd.ms-excel",
          },
        ],
        additional: [
          {
            header: "По каким вопросам обращатся",
            value: "Обращатся только по вопросам закупок",
            name: "",
            type: "",
          },
          {
            header: "Доп.документы",
            value: "Ответственные за работу",
            name: "Список ответсвенных.xls",
            type: "application/vnd.ms-excel",
          },
          {
            header: "Портфолио",
            value: "Информация о клиенте",
            name: "Портфолио.doc",
            type: "application/msword",
          },
        ],
      },
    },
  },
];
export function clientsServer() {
  createServer({
    routes() {
      this.get("/api/clients", () => {
        return dataClients.map((el) => ({
          ...el.note_to_person.basic_info,
          id: el.id,
          last_name: el.last_name,
          first_name: el.first_name,
          patronymic: el.patronymic,
        }));
      });
      this.passthrough("http://45.84.227.122:8080/**");
      this.get("/api/detail/:id", (schema, request) => {
        let id = request.params.id;
        let client = dataClients.find((el) => el.id === id);
        return {
          ...client.note_to_person.additional_info,
          id: client.id,
          pass: client.identity_document_to_person.pass,
        };
      });
    },
  });
}
