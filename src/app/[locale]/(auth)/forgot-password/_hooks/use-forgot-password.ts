import { forgoPasswordAction } from "@/lib/actions/auth.action";
import { registerValues } from "@/lib/schemes/authschema";
import { useMutation } from "@tanstack/react-query";

export default function useForgotPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: registerValues["email"]) => {
      const payload = await forgoPasswordAction(email);
      console.log("payload", payload);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { isPending, error, message: mutate };
}
