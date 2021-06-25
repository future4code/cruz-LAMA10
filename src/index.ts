import dotenv from "dotenv";
import App from "./app";
import userHandle from "./routes/userRouter";

dotenv.config();

const expressApp: App = new App([userHandle]);

expressApp.init().listen();
