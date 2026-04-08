export type ActionSeverity = 'urgent' | 'warning' | 'info';

export interface Action {
  severity: ActionSeverity;
  title: string;
  meta: string;
  actionLabel: string;
}
