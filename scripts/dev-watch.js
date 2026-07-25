// Restarts `next dev` automatically whenever tailwind.config.ts changes.
// Needed because Tailwind's config module gets cached by Node and doesn't
// hot-reload through Next's normal file watcher on this project.
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { rmSync } = require("fs");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "tailwind.config.ts");

let child = null;

function killTree(pid) {
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore" });
    } else {
      process.kill(-pid, "SIGKILL");
    }
  } catch {}
}

function startServer() {
  if (child && child.pid) {
    killTree(child.pid);
  }
  try {
    rmSync(path.join(root, ".next"), { recursive: true, force: true });
  } catch {}
  console.log("[dev-watch] starting next dev...");
  child = spawn("npx", ["next", "dev"], {
    cwd: root,
    stdio: "inherit",
    shell: true,
    detached: process.platform !== "win32",
  });
}

let lastMtime = fs.statSync(configPath).mtimeMs;
fs.watchFile(configPath, { interval: 500 }, (curr) => {
  if (curr.mtimeMs !== lastMtime) {
    lastMtime = curr.mtimeMs;
    console.log("[dev-watch] tailwind.config.ts changed, restarting server...");
    startServer();
  }
});

startServer();

process.on("SIGINT", () => {
  if (child) child.kill("SIGTERM");
  process.exit();
});
