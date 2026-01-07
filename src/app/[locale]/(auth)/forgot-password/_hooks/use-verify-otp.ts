import { verifyOtp } from "@/lib/actions/auth.action";
import { otpValues } from "@/lib/schemes/authschema";
import { useMutation } from "@tanstack/react-query";

export default function useOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: otpValues & { email: string }) => {
      const payload = await verifyOtp(values);
      console.log("payload", payload);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { isPending, error, code: mutate };
}
