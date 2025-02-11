import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 tracking-widest whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-neutral-50 transition-shadow hover:bg-neutral-900/90 hover:shadow dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive:
          'bg-red-500 text-neutral-50 transition-shadow hover:bg-red-500/90 hover:shadow-sm dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        primary:
          'border-none flex self-start gap-3 bg-blue-600 text-white font-black uppercase shadow-sm shadow-blue-400 transition-all hover:shadow-lg hover:bg-blue-500 dark:bg-blue-700 dark:shadow-blue-900 dark:hover:bg-blue-500',
        outline:
          'border border-neutral-400 shadow-neutral-200 shadow-sm transition-all hover:shadow hover:shadow-md hover:shadow-neutral-400 dark:border-neutral-800 dark:text-neutral-300 dark:shadow-neutral-800 dark:hover:bg-neutral-200 dark:hover:shadow-neutral-500 dark:hover:text-neutral-900 dark:hover:border-neutral-200',
        secondary:
          'bg-neutral-100 text-neutral-900 transition-shadow hover:bg-neutral-100/80 hover:shadow-sm dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
