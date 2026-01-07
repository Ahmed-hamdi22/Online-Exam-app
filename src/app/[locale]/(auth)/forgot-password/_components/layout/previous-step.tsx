'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { MoveLeft } from 'lucide-react';

export default function PreviousStep({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant={'ghost'}
      {...props}
      className={cn(
        'ms-2 border border-gray-200 size-10 flex items-center justify-center',
        className
      )}
    >
      <MoveLeft />
    </Button>
  );
}
