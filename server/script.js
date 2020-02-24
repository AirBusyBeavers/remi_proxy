import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "30s"
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//GET Gallery Listings
export default function() {
  var randomQuery = getRandomInt(0,9);
  //set popular query to be 80% and less popular to be 20%
  if (randomQuery < 2) {
    var random = getRandomInt(0,9999999);
  } else {
    var random = getRandomInt(9999800,9999900);
  }
  let res = http.get(`http://localhost:3004/gallery/${random}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 500
  });
  sleep(0.001);
};

//GET Gallery
// export default function() {
//     let res = http.get(`http://localhost:3004/gallery/`);
//     check(res, {
//       "status was 200": (r) => r.status == 200,
//       "transaction time OK": (r) => r.timings.duration < 3000
//     });
//     sleep(0.001);
//   };

//POST
// var random = 10000001;

// export default function() {
//     random++;
//     console.log(random);
    // let res = http.post(`http://localhost:3000/gallery/`, {listing_id: 10000001, listing_title: 'hello', id: 0, url: 'hello.com', caption: "this is a test"});
//     check(res, {
//       "status was 200": (r) => r.status == 200,
//       "transaction time OK": (r) => r.timings.duration < 200
//     });
//     sleep(0.0001);
//   };