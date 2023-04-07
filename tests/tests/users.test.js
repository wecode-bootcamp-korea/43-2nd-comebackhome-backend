const request = require("supertest");
const axios = require("axios");

const createApp = require("../../app");
const appDataSource = require("../../api/models/dataSource");

jest.mock("axios");

describe("KAKAO LOGIN", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await appDataSource.query(`
      INSERT INTO social_types (id, name) VALUES (1, "Kakao")
    `);
  });
  afterAll(async () => {
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`TRUNCATE social_types`);
    await appDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await appDataSource.query(`ALTER TABLE social_types AUTO_INCREMENT = 1`);
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=1");
    await appDataSource.destroy();
  });

  test("FAILED : NEED_KAKAOTOKEN", async () => {
    const response = await request(app).post("/users/kakao/login");
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: "NEED_KAKAOTOKEN" });
  });

  test("SUCCESS: KAKAO_SIGNUP AND LOGIN", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 123456,
        properties: {
          nickname: "test_nickname",
          thumbnail_image: "test_image.url",
        },
        kakao_account: {
          email: "test_email",
        },
      },
    });

    const response = await request(app)
      .post("/users/kakao/login")
      .set({ Authorization: "TEST_KAKAO_TOKEN" });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.nickname).toEqual("test_nickname");
    expect(response.body.profileImage).toEqual("test_image.url");
  });
});
