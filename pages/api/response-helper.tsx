import ResponseHelper from "@/utils/ResponseHelper";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
    try {
        const data = { message: "Success" }; // Example data
        return ResponseHelper(res,"ACK", "Operation Successful", null, null, data);
    } catch (error) {
        return ResponseHelper(
            res,
            "NACK",
            "Operation Failed",
            "SERVER_ERROR",
            error instanceof Error ? error.message : "Unknown error",
            null
        );
    }
}
