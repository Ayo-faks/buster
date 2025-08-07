import React, { useImperativeHandle } from 'react';
import type { Value, AnyPluginConfig } from 'platejs';
import { Plate, type TPlateEditor } from 'platejs/react';
import { EditorContainer } from './EditorContainer';
import { Editor } from './Editor';
import { useReportEditor } from './useReportEditor';
import { useMemoizedFn } from '@/hooks';
import { ReportElements } from '@buster/server-shared/reports';
import { cn } from '@/lib/utils';
import { ThemeWrapper } from './ThemeWrapper/ThemeWrapper';

interface ReportEditorProps {
  // We accept the generic Value type but recommend using ReportTypes.Value for type safety
  value: ReportElements;
  placeholder?: string;
  readOnly?: boolean;
  variant?: 'default';
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onValueChange?: (value: ReportElements) => void;
  useFixedToolbarKit?: boolean;
  onReady?: (editor: IReportEditor) => void;
}

export type IReportEditor = TPlateEditor<Value, AnyPluginConfig>;

export interface AppReportRef {
  editor: TPlateEditor<Value, AnyPluginConfig> | null;
  onReset: () => void;
}

// AppReport is a functional component wrapped in forwardRef to allow parent components to access the underlying editor instance if needed.
export const ReportEditor = React.memo(
  React.forwardRef<AppReportRef, ReportEditorProps>(
    (
      {
        value,
        placeholder,
        onValueChange,
        onReady,
        variant = 'default',
        className,
        containerClassName,
        style,
        useFixedToolbarKit = false,
        readOnly = false,
        disabled = false
      },
      ref
    ) => {
      // Initialize the editor instance using the custom useEditor hook
      const editor = useReportEditor({ value, disabled, useFixedToolbarKit, onReady });

      const onReset = useMemoizedFn(() => {
        editor?.tf.reset();
      });

      // Optionally expose the editor instance to the parent via ref
      useImperativeHandle(ref, () => ({ editor, onReset }), [editor]);

      const onValueChangePreflight = useMemoizedFn(
        ({ value, editor }: { value: Value; editor: TPlateEditor<Value, AnyPluginConfig> }) => {
          onValueChange?.(value as ReportElements);
        }
      );

      if (!editor) return null;

      return (
        <ThemeWrapper>
          <Plate editor={editor} readOnly={readOnly} onValueChange={onValueChangePreflight}>
            <EditorContainer
              variant={variant}
              readonly={readOnly}
              disabled={disabled}
              className={containerClassName}>
              <Editor
                style={style}
                placeholder={placeholder}
                disabled={disabled}
                className={cn('pb-[20vh]', className)}
                autoFocus
              />
            </EditorContainer>
          </Plate>
        </ThemeWrapper>
      );
    }
  )
);

ReportEditor.displayName = 'ReportEditor';
