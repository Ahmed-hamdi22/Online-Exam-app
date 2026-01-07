import { NewPaswordAction } from "@/lib/actions/auth.action";
import { newPasswordValues } from "@/lib/schemes/authschema";
import { useMutation } from "@tanstack/react-query";

export default function useNewPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (
      values: Pick<newPasswordValues, "newPassword"> & { email: string }
    ) => {
      const payload = await NewPaswordAction(values);
      console.log("payload", payload);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { isPending, error, Restpassword: mutate };
}
