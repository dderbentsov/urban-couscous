import { createServer } from "miragejs";

const dataClients = {
  count: 4,
  next: null,
  previous: null,
  results: [
    {
      id: "14ff401c-2b7b-4d9a-9159-720c74d8b23c",
      last_name: "Гагарин",
      first_name: "Юрий",
      patronymic: "Алексеевич",
      birth_date: "1994-12-04",
      priority: 1,
      contacts: [
        {
          id: "92d19144-8c1d-4061-a9c4-755ee2d4ead1",
          kind: "EMAIL",
          username: "gagarin@yandex.ru",
        },
        {
          id: "92d13223-8c1d-4061-a9c4-8155344eae23",
          kind: "TELEGRAM",
          username: "+79309856765",
        },
      ],
      identity_documents: [
        {
          id: "9023ce5c-4a9a-4c0d-a777-a2d7d2690ec3",
          created_at: "2022-10-20T22:01:09.201794Z",
          updated_at: "2022-10-24T15:44:29.235350Z",
          deleted_flg: false,
          kind: "Паспорт",
          numba: "1233 123312",
          issued_by_org: "Отделом УФМС России по рязанской области",
          issued_by_date: "2022-10-10",
          issued_by_org_code: "426–234",
          created_by: null,
          updated_by: null,
          person_id: "14ff401c-2b7b-4d9a-9159-720c74d8b23c",
        },
      ],
    },
    {
      id: "db831a14-e836-481f-a653-6325de7c311e",
      last_name: "Жмыхов",
      first_name: "Егор",
      patronymic: "Сергеевич",
      birth_date: "1997-09-03",
      priority: 3,
      contacts: [
        {
          id: "d2dd7cf2-e4a4-41d7-8987-381ea827da0a",
          kind: "PHONE",
          username: "+79991239988",
        },
        {
          id: "dak2b4n4-669e-4c18-8b7e-fsk7261f82m1",
          kind: "VK",
          username: "@id13592839",
        },
      ],
      identity_documents: [
        {
          id: "np334sw24-4a9a-4c0d-a777-zr348cv4bv",
          created_at: "2022-10-20T22:01:09.201794Z",
          updated_at: "2022-10-24T15:44:29.235350Z",
          deleted_flg: false,
          kind: "Паспорт",
          numba: "9543 547021",
          issued_by_org: "Отделом УФМС России по владимирской области",
          issued_by_date: "2014-09-08",
          issued_by_org_code: "743–126",
          created_by: null,
          updated_by: null,
          person_id: "db831a14-e836-481f-a653-6325de7c311e",
        },
      ],
    },
    {
      id: "db8jd58x-e836-481f-a653-oq1m4e7c09e1",
      last_name: "Калинкин",
      first_name: "Дмитрий",
      patronymic: "Александрович",
      birth_date: "1990-11-05",
      priority: 2,
      contacts: [
        {
          id: "ds81ncf2-1e3v-41d7-0127-381323n6da0a",
          kind: "PHONE",
          username: "+79208324523",
        },
        {
          id: "lc5n7cf2-1m9v-41d7-12z7-kdj5j8821cm7",
          kind: "EMAIL",
          username: "kalindm@gmail.com",
        },
        {
          id: "1f0323n2-669e-xzv9-8b7e-dk11nsd882kd",
          kind: "DISCORD",
          username: "kalin123",
        },
        {
          id: "ds4323n2-669e-xzv9-8b7e-vkj2mcv05sx2",
          kind: "TELEGRAM",
          username: "+79208324523",
        },
      ],
      identity_documents: [
        {
          id: "ob234uf432-e836-481f-a653-334qq9sdw22",
          created_at: "2022-10-20T22:01:09.201794Z",
          updated_at: "2022-10-24T15:44:29.235350Z",
          deleted_flg: false,
          kind: "Паспорт",
          numba: "4308 205732",
          issued_by_org: "Отделом УФМС России по московской области",
          issued_by_date: "2018-11-03",
          issued_by_org_code: "902–571",
          created_by: null,
          updated_by: null,
          person_id: "db8jd58x-e836-481f-a653-oq1m4e7c09e1",
        },
      ],
    },
    {
      id: "cs5ms771-e836-kdc4-a653-sc4n567sx123",
      last_name: "Артышова",
      first_name: "Юлия",
      patronymic: "Андреевна",
      birth_date: "2000-08-17",
      priority: null,
      contacts: [
        {
          id: "d2dd7cf2-e4a4-41d7-8987-381ea827da0a",
          kind: "PHONE",
          username: "+79238433421",
        },
        {
          id: "34cka2k5-669e-4c18-8b7e-34ncv82224mv",
          kind: "VK",
          username: "@id382804",
        },
        {
          id: "jdf921nx-669e-4c18-8b7e-cvx722mvu6o2",
          kind: "DISCORD",
          username: "artshow23",
        },
      ],
      identity_documents: [
        {
          id: "3nb4v223-e836-481f-a653-9012nf3b2",
          created_at: "2022-10-20T22:01:09.201794Z",
          updated_at: "2022-10-24T15:44:29.235350Z",
          deleted_flg: false,
          kind: "Паспорт",
          numba: "1602 671922",
          issued_by_org: "Отделом УФМС России по тульской области",
          issued_by_date: "2017-01-21",
          issued_by_org_code: "101–238",
          created_by: null,
          updated_by: null,
          person_id: "cs5ms771-e836-kdc4-a653-sc4n567sx123",
        },
      ],
    },
  ],
};

const clientDetail = [
  {
    person_id: "14ff401c-2b7b-4d9a-9159-720c74d8b23c",
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
          value: "1994-12-04",
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
  {
    person_id: "db831a14-e836-481f-a653-6325de7c311e",
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
          value: "1997-09-03",
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
  {
    person_id: "db8jd58x-e836-481f-a653-oq1m4e7c09e1",
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
          value: "1990-11-05",
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
  {
    person_id: "cs5ms771-e836-kdc4-a653-sc4n567sx123",
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
          value: "2000-08-17",
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
];

export function clientsServer() {
  createServer({
    routes() {
      this.get("/api/clients", () => {
        return dataClients;
      });
      this.get("/registry/event/", () => ({
        count: 4,
        next: null,
        previous: null,
        results: [
          {
            id: "6faa6bb6-1de6-422c-a401-1b35cd455303",
            start: "2022-10-25T11:15:49Z",
            end: "2022-10-25T12:00:53Z",
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
                role: "owner",
              },
              {
                id: "f941a0c6-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db831a14-e836-481f-a653-6325de7c311e",
                  last_name: "Жмыхов",
                  first_name: "Егор",
                  patronymic: "Сергеевич",
                },
                role: null,
              },
            ],
          },
          {
            id: "6faa6bb6-1de6-422c-a401-1b35cd455303",
            start: "2022-10-25T13:00:49Z",
            end: "2022-10-25T13:30:53Z",
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
            id: "2faa7bb2-2de6-422c-a401-1b35cd455223",
            start: "2022-10-25T15:00:00Z",
            end: "2022-10-25T16:10:00Z",
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
            id: "2faa5ff2-2de6-422c-a401-1b35cd455223",
            start: "2022-10-25T17:10:00Z",
            end: "2022-10-25T18:00:00Z",
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
            id: "2faa5ff2-2de6-422c-a401-1b35cd455223",
            start: "2022-10-26T20:10:00Z",
            end: "2022-10-26T21:00:00Z",
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
                role: null,
              },
              {
                id: "f541a0c7-c750-4f79-92c0-d7a19354e422",
                employee: {
                  id: "db938a67-e756-481f-a653-6325de7c567e",
                  last_name: "Коломойцев",
                  first_name: "Илья",
                  patronymic: "Константинович",
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
        return clientDetail.find((el) => el.person_id === id);
      });
      this.get("/api/detail/identity_document/:id", (schema, request) => {
        let id = request.params.id;
        let pass = dataClients.results.find((el) => el.id === id);
        return pass.identity_documents[0];
      });
    },
  });
}
