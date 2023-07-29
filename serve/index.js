import express from "express";
import bodyParser from "body-parser";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import stories from './routes/stories.js'

//middlewares， 前端配置了withCredentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/**
 * 解析token效验是否正确，哪些接口需要token效验,中间件
 */
// app.use(
//     expressJwt({secret:"secretkey",algorithms:['HS256']}).unless({
//         path:['/api/auth/register', '/api/auth/login'] 
//     }))

//解析json数据
app.use(express.json());
//解析body数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(cookieParser());

// multer.diskStorage 允许你将上传的文件保存到磁盘上的特定位置，并定义一些选项来自定义文件的命名和存储路径
// 自定义文件的存储方式，例如将文件保存到特定的目录、定义文件名的规则等。
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload"); // // 指定上传文件保存的目录
  },
  filename: function (req, file, cb) {
    // 自定义文件名的规则
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// // 在路由中使用 upload 中间件处理文件上传
app.post("/api/upload", upload.single("file"), (req, res) => {
  // 文件上传成功后的处理
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", stories);

app.listen(8800, () => {
  console.log("API working!");
});
