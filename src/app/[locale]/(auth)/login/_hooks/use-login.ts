import { loginValues } from '@/lib/schemes/authschema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { safeCallbackPath } from '@/lib/utils/auth-callback';

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: loginValues) => {
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: safeCallbackPath(
          new URLSearchParams(window.location.search).get('callbackUrl')
        ),
      });
      if (response?.error) throw new Error(response.error);
      if (!response?.ok) throw new Error('Unable to sign in');
      const destination = new URL(
        response.url || '/dashboard/subjects',
        location.origin
      );
      location.assign(
        destination.origin === location.origin
          ? destination.href
          : '/dashboard/subjects'
      );
    },
  });
  return { isPending, error, mutate };
}
