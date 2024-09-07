import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";


(async () => {

  main();


})();


async function main() {
  console.log('envs', envs )

  Server.start();
}