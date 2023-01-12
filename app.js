//step1. built-in module 호출하여 http로 변수에 담는다
const http = require("http");
//step2. server객체 생성
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

//step3. client에서 요청이 들어왔을때 요청을 처리하는 함수 생성
const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "POST") {
    //user
    if (url === "/users/signin") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        // posts에도 push하기 위해서는 response의 end에 posts : posts가 되어야 할것 같은데 이때 if문을 쓰면 될까...?
        response.writeHead(200, { "Content-type": "application/json" });
        response.end(JSON.stringify({ message: "userCreated" }));
      });
      //post
    } else if (url === "/posts/posting") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
        });
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ message: "postCreated" }));
      });
    }
  }
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & PORT ${PORT}`);
});
