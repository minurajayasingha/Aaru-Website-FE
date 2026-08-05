const { execSync } = require("node:child_process");

execSync("npx next build", { stdio: "inherit" });
