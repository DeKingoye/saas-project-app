import { NextRequest, NextResponse } from "next/server";
import client from "prom-client";

// Define a Prometheus Summary metric
const requestSummary = new client.Summary({
    name: "app_elapsed_time_seconds",
    help: "Time difference between start and stop tracking",
    labelNames: ["label_1", "label_2", "label_3", "label_4", "label_5", "label_6"],
});

// Register the metric if not already registered
if (!client.register.getSingleMetric("app_elapsed_time_seconds")) {
    client.register.registerMetric(requestSummary);
}

// Handle POST requests
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { label_1, label_2, label_3, label_4, label_5, label_6, value } = body;

        if (!label_1 || !label_2 || !label_3 || !label_4 || !label_5 || !label_6 || typeof value !== "number") {
            return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
        }

        // Record the time difference as a metric
        requestSummary.labels(label_1, label_2, label_3, label_4, label_5, label_6).observe(value);

        return NextResponse.json({ message: "Metric recorded", duration: value }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}