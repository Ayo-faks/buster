'use client';

import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin
} from '@platejs/media/react';
import { KEYS } from 'platejs';

import { AudioElement } from '../elements/AudioNode';
import { MediaEmbedElement } from '../elements/MediaEmbedNode';
import { FileElement } from '../elements/MediaFileNode';
import { ImageElement } from '../elements/MediaImageNode';
import { PlaceholderElement } from '../elements/MediaPlaceholderElement';
import { MediaPreviewDialog } from '../elements/MediaPreviewDialog';
import { MediaUploadToast } from '../elements/MediaUploadToast';
import { VideoElement } from '../elements/MediaVideoNode';
import { MediaPluginOptions } from '@platejs/media';
import { CUSTOM_KEYS } from '../config/keys';

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true }
    // render: {
    //afterEditable: MediaPreviewDialog, node: ImageElement
    //   }
  }),
  MediaEmbedPlugin.configure({
    node: {
      component: MediaEmbedElement,
      isSelectable: true,
      isElement: true
    },
    options: {}
  }),

  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: false },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement }
  })

  // VideoPlugin.withComponent(VideoElement),
  // AudioPlugin.withComponent(AudioElement),
  // FilePlugin.withComponent(FileElement),
];
