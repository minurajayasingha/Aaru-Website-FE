// Restarts `next dev` automatically whenever tailwind.config.ts changes.
// Needed because Tailwind's config module gets cached by Node and doesn't
// hot-reload through Next's normal file watcher on this project.
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { rmSync } = require("fs");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "tailwind.config.ts");
const PORT = 3000;

let child = null;

// Killing the tracked child PID isn't reliable on Windows: `npx next dev`
// spawns through a shell + npx wrapper, so child.pid often doesn't point at
// the actual process holding the port, and previous restarts silently left
// zombie servers behind (bumping later runs to 3001, 3002, ...). Killing by
// the port itself is the only thing that's actually reliable.
function killPort(port) {
  try {
    if (process.platform === "win32") {
      const output = execSync(`netstat -ano`, { encoding: "utf8" });
      const pids = new Set();
      const listening = new RegExp(`:${port}\\s+\\S+\\s+LISTENING\\s+(\\d+)`);
      for (const line of output.split("\n")) {
        const match = line.match(listening);
        if (match) pids.add(match[1]);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {}
      }
    } else {
      execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: "ignore", shell: "/bin/sh" });
    }
  } catch {}
}

function startServer() {
  if (child && child.pid) {
    try {
      process.platform === "win32" ? execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: "ignore" }) : process.kill(-child.pid, "SIGKILL");
    } catch {}
  }
  killPort(PORT);
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
