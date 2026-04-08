/**
 * --- shadcn/ui 工具函数 ---
 * 与 shadcn/ui 官方 lib/utils.ts 完全一致。
 * 所有控件通过此函数合并 Tailwind class。
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
