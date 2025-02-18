import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

interface StatusType {
    NACK: "NACK";
    ACK: "ACK";
}

interface ResponsePayload {
    status: keyof StatusType;
    type: string;
    error?: {
        type: string | null;
        message: string | null;
    };
    data?: Record<string, string> | Record<string, string>[] | null;
}

const ResponseHelper = (
    res: NextApiResponse,  
    status: keyof StatusType,
    type: string,
    errorType: string | null = null,
    errorMessage: string | null = null,
    data: Record<string, string> | Record<string, string>[] | null = null
): NextApiResponse => {  
    const responsePayload: ResponsePayload = { status, type };

    if (status === "NACK") {
        responsePayload.error = {
            type: errorType,
            message: errorMessage,
        };
    } else if (status === "ACK") {
        responsePayload.data = data;
    }

    return res.status(200).json(responsePayload); 
};

export default ResponseHelper;
