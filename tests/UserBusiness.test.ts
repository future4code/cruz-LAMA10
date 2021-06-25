import { UserBusiness } from "../src/business/user/UserBusiness";
import idGeneratorMock from "./mocks/services/idGeneratorMock";
import hashGeneratorMock from "./mocks/services/hashGeneratorMock";
import tokenGeneratorMock from "./mocks/services/tokenGeneratorMock";
import userDatabaseMock from "./mocks/data/UserDatabaseMock";
import { LoginInputDTO, UserInputDTO } from "../src/model/User";

const userBusinessMock = new UserBusiness(
  tokenGeneratorMock,
  hashGeneratorMock,
  idGeneratorMock,
  userDatabaseMock
);

describe("UserBusiness", () => {
  describe("signUp", () => {
    test("Should catch error when name is empty", async () => {
      expect.assertions(2);

      try {
        const data: UserInputDTO = {
          email: "test@mail.com",
          name: "",
          password: "assadas@1132",
          role: "NORMAL",
        };

        await userBusinessMock.signUp(data);
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Missing input");
      }
    });

    test("Should catch error when email is invalid", async () => {
      expect.assertions(2);

      try {
        const data: UserInputDTO = {
          email: "testail.com",
          name: "teste",
          password: "assadas@1132",
          role: "NORMAL",
        };

        await userBusinessMock.signUp(data);
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Invalid email");
      }
    });

    test("Should catch error when password is invalid", async () => {
      expect.assertions(2);

      try {
        const data: UserInputDTO = {
          email: "test@mail.com",
          name: "teste",
          password: "assa",
          role: "NORMAL",
        };

        await userBusinessMock.signUp(data);
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Invalid password");
      }
    });

    test("Should catch error when role is invalid", async () => {
      expect.assertions(2);

      try {
        const data: UserInputDTO = {
          email: "test@mail.com",
          name: "teste",
          password: "assA@154",
          role: "GUEST",
        };

        await userBusinessMock.signUp(data);
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Invalid user role");
      }
    });

    test("Should return access token on sucessful signup", async () => {
      expect.assertions(1);

      try {
        const data: UserInputDTO = {
          email: "test@mail.com",
          name: "teste",
          password: "assA@154",
          role: "NORMAL",
        };

        const accessToken = await userBusinessMock.signUp(data);

        expect(accessToken).toBe("token_mock");
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe("login", () => {
    test("Should catch error when email is not registered", async () => {
      expect.assertions(2);

      try {
        const data: LoginInputDTO = {
          email: "astrodev22@mail.com",
          password: "123456",
        };
        await userBusinessMock.login(data);
      } catch (error) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Invalid credentials");
      }
    });

    test("Should catch error when password is incorrect", async () => {
      expect.assertions(2);

      try {
        const data: LoginInputDTO = {
          email: "astrodev@mail.com",
          password: "12346",
        };

        await userBusinessMock.login(data);
      } catch (error) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Invalid credentials");
      }
    });

    test("Should return access token on sucessful login", async () => {
      expect.assertions(1);

      try {
        const data: LoginInputDTO = {
          email: "astrodev@mail.com",
          password: "astrodev123",
        };
        const accessToken = await userBusinessMock.login(data);

        expect(accessToken).toBe("token_mock");
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
