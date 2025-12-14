import "server-only";
import fs from "fs/promises";
import path from "path";
import { PortfolioDataSchema, type PortfolioData } from "./types";

const DATA_PATH = path.join(process.cwd(), "content", "portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
    try {
        const fileContent = await fs.readFile(DATA_PATH, "utf-8");
        const jsonData = JSON.parse(fileContent);

        // Validate schema
        const result = PortfolioDataSchema.safeParse(jsonData);

        if (!result.success) {
            console.error("Portfolio data validation failed:", result.error);
            throw new Error("Invalid portfolio data structure");
        }

        return result.data;
    } catch (error) {
        console.error("Failed to read portfolio data:", error);
        throw new Error("Failed to load portfolio content");
    }
}
