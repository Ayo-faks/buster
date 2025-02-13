import { BusterTerm, BusterTermListItem } from '@/api/buster_rest';
import { ContextSelector } from '@fluentui/react-context-selector';

export type UseTermsContextSelector = <T>(selector: ContextSelector<UseTermsHookReturn, T>) => T;

export interface UseTermsHookReturn {
  getTermFromList: (termId: string) => BusterTermListItem | undefined;
  createTerm: (params: any) => Promise<any>;
  subscribeToTerm: ({ id }: { id: string }) => Promise<any>;
  termsList: BusterTermListItem[];
  loadedTermsList: boolean;
  getInitialTerms: () => Promise<void>;
  onSetOpenNewTermsModal: (value: boolean) => void;
  updateTerm: (params: any) => Promise<any>;
  deleteTerm: ({ id }: { id: string }, ignoreConfirm?: boolean) => Promise<any>;
  openNewTermsModal: boolean;
  unsubscribeFromTerm: (termId: string) => void;
  terms: Record<string, BusterTerm>;
}
