import { cn } from '@/lib/utils/cn';
import { CircleX } from 'lucide-react';
import React from 'react';

export default function FeedBack({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p
      {...props}
      className={cn(
        'relative p-2 text-sm text-red-600 flex items-center justify-center text-center border border-red-600 rounded-md bg-red-50',
        className
      )}
    >
      {/* Icon */}

      <CircleX
        size={18}
        className="absolute left-1/2 top-0 bg-white -translate-x-1/2 -translate-y-1/2"
      />
      {children}
    </p>
  );
}
