import dotenv from "dotenv";
import App from "./app";
import userHandle from "./routes/userRouter";
import bandHandle from "./routes/bandRouter";

dotenv.config();

const expressApp: App = new App([userHandle, bandHandle]);

expressApp.init().listen();
