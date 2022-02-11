import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

const app = express();

// NOTES : HIER => problème avec style.css => route ???
// TODAY => VERIFIER : 3 si retour OK plus problème submit et bouton + faire

// formulaire :

const formParser = express.urlencoded({ extended: true });

// cookie :

app.get("/add-cookie", (request, response) => {
  const color = "";

  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", color, {
      maxAge: 3600, // This is the time (in seconds) that this cookie will be stored
    }),
  );

  response.send("The cookie has been set");
});

app.get("/view-cookie", (request, response) => {
  const cookies = cookie.parse(request.get("cookie") || "");

  response.send(cookies.myCookie);
});

// nunjucks :

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

// public :

app.use(express.static("public"));

// app home :

app.get("/", (request, response) => {
  response.render("home");
});

// app options :

app.get("/options", (request, response) => {
  response.render("options");
});

app.post("/handle-form", formParser, (request, response) => {
  // request.body contains an object with our named fields
  // console.log()
  response.send(JSON.stringify(request.body));
});

// serveur :

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
