import dotenv from "dotenv";
import App from "./app";
import userHandle from "./routes/userRouter";
import bandHandle from "./routes/bandRouter";
import showHandle from "./routes/showRouter";

dotenv.config();

const expressApp: App = new App([userHandle, bandHandle, showHandle]);

expressApp.init().listen();
