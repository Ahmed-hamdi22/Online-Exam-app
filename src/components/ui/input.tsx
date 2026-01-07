import * as React from 'react';

import { cn } from '@/lib/utils/cn';
import { useFormField } from './form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  const { error } = useFormField();
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        error && 'border-red-600  focus-visible:ring-red-600',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextInput.displayName = 'TextInput';

// Password Input
const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => {
  const { error } = useFormField();
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <TextInput
        ref={ref}
        {...props}
        type={show ? 'text' : 'password'}
        className={cn(
          error && 'border-red-600 focus-visible:ring-red-600',
          className
        )}
      />
      <Button
        type="button"
        variant="ghost"
        className=" text-gray-400 absolute -end-0 top-1/2 bg-transparent hover:bg-transparent -translate-y-1/2"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? (
          <Eye strokeWidth={1.5} size={18} className="text-gray-400" />
        ) : (
          <EyeOff strokeWidth={1.5} size={18} className="text-gray-400" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

// Password Input

// Global  Input

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ type, ...props }, ref) => {
    switch (type) {
      case 'text':
        return <TextInput ref={ref} {...props} />;
      case 'password':
        return <PasswordInput ref={ref} {...props} />;

      default:
        return <TextInput ref={ref} {...props} />;
    }
  }
);
Input.displayName = 'Input';

export { Input };
