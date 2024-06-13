import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 30,
  duration: "30s",
};

export default function () {
  let res = http.get("http://localhost:3000/api/1.0/getAllRecipes?sort=time");
  console.log(res);
  check(res, { "status was 200": (r) => r.status === 200 });
  sleep(1);
}
