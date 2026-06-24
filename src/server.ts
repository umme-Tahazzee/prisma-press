import "dotenv/config";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";
import config from "./config/index.js";



const PORT = config.port

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to DB successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.log("Error starting the server", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();