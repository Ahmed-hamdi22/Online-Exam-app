import { cn } from '@/lib/utils/cn';
import React from 'react';

type HeadlineProps = {
  description?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export default function Headline({
  className,
  description,
  children,
  ...props
}: HeadlineProps) {
  return (
    <div className="space-y-2">
      <h1 className={cn('text-3xl font-bold', className)} {...props}>
        {children}
      </h1>

      {description && (
        <p className="text-sm text-gray-500 max-w-md">{description}</p>
      )}
    </div>
  );
}
