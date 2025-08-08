import { EditorStatic } from '../elements/EditorStatic';
import { useBusterNotifications } from '@/context/BusterNotifications';
import type { PlateEditor } from 'platejs/react';
import { NodeTypeLabels } from '../config/labels';
import { createSlateEditor, serializeHtml } from 'platejs';
import { MarkdownPlugin } from '@platejs/markdown';
import { useMemo } from 'react';

export const useExportReport = () => {
  const { openErrorMessage, openInfoMessage } = useBusterNotifications();

  const getCanvas = async (editor: PlateEditor) => {
    const { default: html2canvas } = await import('html2canvas-pro');

    const style = document.createElement('style');
    document.head.append(style);

    // Standard width for consistent PDF output (equivalent to A4 width with margins)
    const standardWidth = '850px';

    const node = editor.api.toDOMNode(editor)!;

    if (!node) {
      throw new Error('Editor not found');
    }

    const canvas = await html2canvas(node, {
      onclone: (document: Document) => {
        const editorElement = document.querySelector('[contenteditable="true"]');
        if (editorElement) {
          // Force consistent width for the editor element
          const existingStyle = editorElement.getAttribute('style') || '';
          editorElement.setAttribute(
            'style',
            `${existingStyle}; width: ${standardWidth} !important; max-width: ${standardWidth} !important; min-width: ${standardWidth} !important;`
          );

          // Apply consistent font family to all elements
          Array.from(editorElement.querySelectorAll('*')).forEach((element) => {
            const elementStyle = element.getAttribute('style') || '';
            element.setAttribute(
              'style',
              `${elementStyle}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important`
            );
          });
        } else {
          throw new Error('Editor element not found');
        }
      }
    });
    style.remove();

    return canvas;
  };

  const downloadFile = async (url: string, filename: string) => {
    const response = await fetch(url);

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  };

  const exportToPdf = async (editor: PlateEditor) => {
    try {
      const canvas = await getCanvas(editor);
      const PDFLib = await import('pdf-lib');
      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage([canvas.width, canvas.height]);
      const imageEmbed = await pdfDoc.embedPng(canvas.toDataURL('PNG'));
      const { height, width } = imageEmbed.scale(1);
      page.drawImage(imageEmbed, {
        height,
        width,
        x: 0,
        y: 0
      });
      const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

      await downloadFile(pdfBase64, 'plate.pdf');
      openInfoMessage(NodeTypeLabels.pdfExportedSuccessfully.label);
    } catch (error) {
      openErrorMessage(NodeTypeLabels.failedToExportPdf.label);
    }
  };

  const exportToImage = async (editor: PlateEditor) => {
    try {
      const canvas = await getCanvas(editor);
      await downloadFile(canvas.toDataURL('image/png'), 'plate.png');
      openInfoMessage(NodeTypeLabels.imageExportedSuccessfully.label);
    } catch (error) {
      openErrorMessage(NodeTypeLabels.failedToExportImage.label);
    }
  };

  const exportToHtml = async (editor: PlateEditor) => {
    try {
      const BaseEditorKit = await import('../editor-base-kit').then(
        (module) => module.BaseEditorKit
      );

      const editorStatic = createSlateEditor({
        plugins: BaseEditorKit,
        value: editor.children
      });

      const editorHtml = await serializeHtml(editorStatic, {
        editorComponent: EditorStatic,
        props: { style: { padding: '0 calc(50% - 350px)', paddingBottom: '' } }
      });

      const siteUrl = 'https://platejs.org';
      const tailwindCss = `<link rel="stylesheet" href="${siteUrl}/tailwind.css">`;
      const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

      const html = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="color-scheme" content="light dark" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
                rel="stylesheet"
              />
              ${tailwindCss}
              ${katexCss}
              <style>
                :root {
                  --font-sans: 'Inter', 'Inter Fallback';
                  --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
                }
              </style>
            </head>
            <body>
              ${editorHtml}
            </body>
          </html>`;

      const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

      await downloadFile(url, 'plate.html');
      openInfoMessage(NodeTypeLabels.htmlExportedSuccessfully.label);
    } catch (error) {
      openErrorMessage(NodeTypeLabels.failedToExportHtml.label);
    }
  };

  const exportToMarkdown = async (editor: PlateEditor) => {
    try {
      const md = editor.getApi(MarkdownPlugin).markdown.serialize();
      const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(md)}`;
      await downloadFile(url, 'plate.md');
      openInfoMessage(NodeTypeLabels.markdownExportedSuccessfully.label);
    } catch (error) {
      openErrorMessage(NodeTypeLabels.failedToExportMarkdown.label);
    }
  };

  return useMemo(
    () => ({
      exportToPdf,
      exportToImage,
      exportToHtml,
      exportToMarkdown
    }),
    []
  );
};
