import Pusher from "pusher-js";

const pusher = new Pusher("621c2db7e47a1fde85df", {
  cluster: "ap1",
});

export default pusher;
