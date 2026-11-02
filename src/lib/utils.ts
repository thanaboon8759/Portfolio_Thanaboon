import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Public files live under the Pages sub-path; encodeURI handles the spaces in PDF names
export const asset = (path: string) => encodeURI(import.meta.env.BASE_URL + path)
