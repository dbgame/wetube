import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import routes from "./routes";
const app = express();

app.use(helmet()); // security
app.set("view engine", "pug");
// cookie parser는 cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어, 사용자 인증 같은 곳에서 쿠키를 검사할 때 사용
app.use(cookieParser());
// body parser 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request 정보에서 form이나 json 형태로 된 body를 검사
// 아바타의 사진이나 비디오를 업로드 할 때, 제목이나 댓글 같은 정보를 전달할 때, formdㅔ 담아서 업로드해야 함
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev")); // logging
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;