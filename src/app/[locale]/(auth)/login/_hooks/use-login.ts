import { loginValues } from '@/lib/schemes/authschema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: loginValues) => {
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (response?.error) throw new Error(response.error);
      const callbackUrl =
        new URL(response?.url || location.origin).searchParams.get(
          'callbackUrl'
        ) || '/';

      location.href = callbackUrl.startsWith('http')
        ? callbackUrl
        : location.origin + callbackUrl;
    },
  });
  return { isPending, error, mutate };
}
