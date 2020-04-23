const request = require("supertest");
const app = require("../whois");

/* {
  "0": "GET    /",
  "1": "GET    /jumplings",
  "2": "POST   /jumplings",
  "3": "GET /jumplings/:id",
  "4": "PUT /jumplings/:id",
  "5": "DELETE /jumplings/:id",
  "6": "-----------------------",
  "7": "POST   /jumplings/presenters",
  "8": "GET    /jumplings/presenters"
} */

const govtechie = { name: "raychua" };

beforeEach(async () => {
  await request(app).post("/v1/govtechies").send(govtechie);
  await request(app).post("/v1/govtechies").send(govtechie);
  await request(app).post("/v1/govtechies").send(govtechie);
});

afterEach(async () => {
  await request(app).delete("/v1/govtechies/1");
  await request(app).delete("/v1/govtechies/2");
  await request(app).delete("/v1/govtechies/3");
  await request(app).delete("/v1/govtechies/4");
  await request(app).delete("/v1/govtechies/5");
});

describe("govtechies.route", () => {
  it("GET / should return status code: 200 ", async () => {
    await request(app).get("/").expect(200);
  });

  it("GET /v1/govtechies get the list of govtechie", async () => {
    const { body: govtechlist } = await request(app)
      .get("/v1/govtechies")
      .expect(200);
    expect(govtechlist[0]).toMatchObject(govtechie);
  });

  it("POST /v1/govtechies allow to add govtechie to the DB", async () => {
    const { body: actualgovtechie } = await request(app)
      .post("/v1/govtechies")
      .send(govtechie)
      .expect(201);
    expect(actualgovtechie).toMatchObject(govtechie);
  });

  it("GET /v1/govtechies/3 should govtechie of id 3", async () => {
    const govtechie3 = { name: "raychua", id: 3 };
    const { body: govtech } = await request(app)
      .get("/v1/govtechies/3")
      .expect(200);
    expect(govtech).toMatchObject(govtechie3);
  });

  it("PUT /v1/govtechies/2 should update govtechie of id 2", async () => {
    const govtechie2 = { name: "ray chua swee phin", id: 2 };
    const { body: govtech } = await request(app)
      .put("/v1/govtechies/2")
      .send(govtechie2)
      .expect(200);
    expect(govtech).toMatchObject(govtechie2);

    const { body: govtech2 } = await request(app)
      .get("/v1/govtechies/2")
      .expect(200);
    expect(govtech2).toMatchObject(govtechie2);
  });

  it("DELETE /v1/govtechies/2 should delete govtechie of id 2", async () => {
    const govtechiedelete = { name: "raychua", id: 2 };
    const { body: govtech } = await request(app)
      .delete("/v1/govtechies/2")
      .expect(200);
    expect(govtech).toMatchObject(govtechiedelete);

    const { body: govtechList } = await request(app)
      .get("/v1/govtechies/")
      .expect(200);
    expect(govtechList.length).toEqual(2);
  });
});
