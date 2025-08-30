import type { ChartConfigProps } from '@buster/server-shared/metrics';
import React from 'react';
import { Text } from '@/components/ui/typography';

export const PaletteApp: React.FC<{
  colors: ChartConfigProps['colors'];
}> = React.memo(() => {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center">
      <Text>Coming soon...</Text>
    </div>
  );
});
PaletteApp.displayName = 'PaletteApp';
