/**
 * --- shadcn/ui Label ---
 * 来源：https://ui.shadcn.com/docs/components/base/label
 * 底层：@radix-ui/react-label
 */
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils.js';

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>;

export function Label({ className, ...props }: LabelProps) {
    return (
        <LabelPrimitive.Root
            className={cn(labelVariants(), className)}
            {...props}
        />
    );
}
