import { serverHTTP } from "./http";
import './websocket'

serverHTTP.listen(3001, () => {
  console.log("Server socket is running PORT => 3001");
});
