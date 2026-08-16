import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    {
      path: "/api/robot-rental/identity-session",
      method: "POST",
    },
  ],
});
