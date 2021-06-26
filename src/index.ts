import dotenv from "dotenv";
import App from "./app";
import userHandle from "./routes/userRouter";
import showHandle from "./routes/showRouter";

dotenv.config();

const expressApp: App = new App([userHandle, showHandle]);

expressApp.init().listen();
