import { createServer } from "miragejs";

export function clientsServer() {
  createServer({
    routes() {
      this.get("/api/clients", () => ({
        dataClients: [
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
        ],
      }));
    },
  });
}
