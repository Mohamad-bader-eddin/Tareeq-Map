import Pusher from "pusher-js";

const pusher = new Pusher("447631a51da812ef4f9d", {
  cluster: "ap2",
});

export default pusher;
