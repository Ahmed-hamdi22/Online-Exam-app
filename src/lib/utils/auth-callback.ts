export function safeCallbackPath(value?: string | null): string {
  if (
    !value?.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\')
  ) {
    return '/dashboard/subjects';
  }

  return value;
}
