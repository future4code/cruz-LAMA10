import { User, UserRole } from "../../src/model/User";

export const userMockAdm = new User(
  "id_mock_admin",
  "astrodev",
  "astrodev@mail.com",
  "astrodev123",
  UserRole.ADMIN
);

export const userMockNormal = new User(
  "id_mock_normal",
  "ale",
  "ale@mail.com",
  "ale123",
  UserRole.NORMAL
);
