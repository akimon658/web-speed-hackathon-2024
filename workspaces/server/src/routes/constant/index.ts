import { Hono } from "hono";
import { COMPANY } from "@wsh-2024/app/src/foundation/constants/Company";
import { CONTACT } from "@wsh-2024/app/src/foundation/constants/Contact";
import { OVERVIEW } from "@wsh-2024/app/src/foundation/constants/Overview";
import { QUESTION } from "@wsh-2024/app/src/foundation/constants/Question";
import { TERM } from "@wsh-2024/app/src/foundation/constants/Term";

const app = new Hono();

app.get("/company", async (c) => c.json({ text: COMPANY }));
app.get("/contact", async (c) => c.json({ text: CONTACT }));
app.get("/overview", async (c) => c.json({ text: OVERVIEW }));
app.get("/question", async (c) => c.json({ text: QUESTION }));
app.get("/term", async (c) => c.json({ text: TERM }))

export { app as constantApp }
