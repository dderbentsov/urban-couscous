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
      this.get("/registry/event/", () => ({
        count: 4,
        next: null,
        previous: null,
        results: [
          {
            id: "6faa6bb6-1de6-422c-a401-1b35cd455303",
            start: "2022-10-24T20:23:49Z",
            end: "2022-10-24T21:23:53Z",
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
                  id: "db541a67-e836-481f-a653-6325de7c567e",
                  last_name: "Захарова",
                  first_name: "Ольга",
                  patronymic: "Александровна",
                },
                role: null,
              },
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
          {
            id: "6faa6bb6-1de6-422c-a401-1b35cd455303",
            start: "2022-10-24T15:23:49Z",
            end: "2022-10-24T16:23:53Z",
            kind: "call",
            subkind: null,
            description: "",
            location: null,
            members: [
              {
                id: "f7648f9a-e824-4bb3-a260-2b32dae9bc74",
                person: {
                  id: "98dd401c-2b7b-4d9a-9159-720c74d8b23v",
                  last_name: "Захарченко",
                  first_name: "Юлия",
                  patronymic: "Николаевна",
                },
                role: null,
              },
            ],
            employees: [
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db541a67-e836-481f-a653-6325de7c567e",
                  last_name: "Захарова",
                  first_name: "Ольга",
                  patronymic: "Александровна",
                },
                role: null,
              },
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
          {
            id: "7faa7bb7-2de6-422c-a401-1b35cd455303",
            start: "2022-10-23T10:00:00Z",
            end: "2022-10-23T11:10:00Z",
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
              {
                id: "a9239f9a-e824-4bb3-a260-2b32dae9bc76",
                person: {
                  id: "15ff465c-2b7b-4d9a-9159-720c74d8b56d",
                  last_name: "Елесеевская",
                  first_name: "Татьяна",
                  patronymic: "Ивановна",
                },
                role: "primary",
              },
            ],
            employees: [
              {
                id: "f941a0c6-c734-4f79-92c2-d7a5674459e422",
                employee: {
                  id: "db831a15-e876-481f-a658-6325de7c311e",
                  last_name: "Константинопольская",
                  first_name: "Юлия",
                  patronymic: "Викторовна",
                },
                role: null,
              },
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db541a67-e836-481f-a653-6325de7c567e",
                  last_name: "Захарова",
                  first_name: "Ольга",
                  patronymic: "Александровна",
                },
                role: "owner",
              },
            ],
          },
          {
            id: "2faa7bb2-2de6-422c-a401-1b35cd455223",
            start: "2022-10-24T10:00:00Z",
            end: "2022-10-24T11:10:00Z",
            kind: "call",
            subkind: null,
            description: "",
            location: null,
            members: [
              {
                id: "a9239f9a-e824-4bb3-a260-2b32dae9bc76",
                person: {
                  id: "15ff465c-2b7b-4d9a-9159-720c74d8b56d",
                  last_name: "Елесеевская",
                  first_name: "Татьяна",
                  patronymic: "Ивановна",
                },
                role: null,
              },
            ],
            employees: [
              {
                id: "f941a0c6-c734-4f79-92c2-d7a5674459e422",
                employee: {
                  id: "db831a15-e876-481f-a658-6325de7c311e",
                  last_name: "Константинопольская",
                  first_name: "Юлия",
                  patronymic: "Викторовна",
                },
                role: "owner",
              },
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db541a67-e836-481f-a653-6325de7c567e",
                  last_name: "Захарова",
                  first_name: "Ольга",
                  patronymic: "Александровна",
                },
                role: null,
              },
            ],
          },
          {
            id: "2faa7bb2-2de6-422c-a401-1b35cd455223",
            start: "2022-10-24T10:00:00Z",
            end: "2022-10-24T11:10:00Z",
            kind: "call",
            subkind: null,
            description: "",
            location: null,
            members: [
              {
                id: "a9239f9a-e824-4bb3-a260-2b32dae9bc76",
                person: {
                  id: "15ff465c-2b7b-4d9a-9159-720c74d8b56d",
                  last_name: "Елесеевская",
                  first_name: "Татьяна",
                  patronymic: "Ивановна",
                },
                role: null,
              },
            ],
            employees: [
              {
                id: "f451a0c3-c734-4f73-91c2-d7a5674459e422",
                employee: {
                  id: "dv841a15-e867-331f-a658-6325de7c311e",
                  last_name: "Коломойцев",
                  first_name: "Илья",
                  patronymic: "Петрович",
                },
                role: "owner",
              },
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db541a67-e836-481f-a653-6325de7c567e",
                  last_name: "Захарова",
                  first_name: "Ольга",
                  patronymic: "Александровна",
                },
                role: null,
              },
            ],
          },
        ],
      }));
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
