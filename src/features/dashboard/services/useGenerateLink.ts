import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api"; // Your axios instance

// Define the request and response types
export interface GenerateLinkRequest {
  amount: string;
  customer_name: string;
  customer_email: string;
  narration: string;
}

export interface GenerateLinkResponse {
  message:string;
  data: string; // Adjust according to your API response structure
}

// Function to generate link
const generateLink = async (amountDetails: GenerateLinkRequest): Promise<GenerateLinkResponse> => {
  const { data } = await axiosInstance.post<GenerateLinkResponse>("/api/generate", amountDetails);
  return data;
};

// Hook to use for generating the link
export default function useGenerateLink(amountDetails: GenerateLinkRequest) {
  return useQuery({
    queryKey: ["generateLink", amountDetails], // Cache key that includes the details
    queryFn: () => generateLink(amountDetails), // Fetch the link
    enabled: false, // Only enable the query if amount is present
  });
}
