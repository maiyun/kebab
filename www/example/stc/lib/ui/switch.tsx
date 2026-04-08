/**
 * --- shadcn/ui Switch ---
 * 来源：https://ui.shadcn.com/docs/components/switch
 * 底层：@radix-ui/react-switch
 */
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils.js';

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-200',
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform',
                    'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
                )}
            />
        </SwitchPrimitive.Root>
    );
}
