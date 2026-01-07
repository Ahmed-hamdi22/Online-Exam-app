import { registerActoin } from '@/lib/actions/auth.action';
import { registerValues } from '@/lib/schemes/authschema';
import { useMutation } from '@tanstack/react-query';

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: registerValues) => {
      const payload = await registerActoin(values);
      if ('code' in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { isPending, error, register: mutate };
}
