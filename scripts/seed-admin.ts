import { config } from "dotenv";
config({ path: ".env.local" });

import { hashPassword } from "../src/lib/auth/password";
import { upsertAdminUser } from "../src/db/queries/adminUsers";

async function main() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error("Usage: npm run seed:admin -- <email> <password>");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  await upsertAdminUser(email, passwordHash);
  console.log(`Admin user ready: ${email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to seed admin user:", error);
  process.exit(1);
});
