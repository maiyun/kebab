/**
 * --- shadcn/ui Input ---
 * 来源：https://ui.shadcn.com/docs/components/input
 * 纯 Tailwind 封装，无 Radix UI 依赖。
 */
import { cn } from '../utils.js';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                'flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                'placeholder:text-slate-400',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
}
