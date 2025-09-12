import type { PlateElementProps } from 'platejs/react';
import { PlateElement } from 'platejs/react';

import { cn } from '@/lib/utils';

export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement {...props} className={cn('mb-2 text-base')}>
      {props.children}
    </PlateElement>
  );
}
