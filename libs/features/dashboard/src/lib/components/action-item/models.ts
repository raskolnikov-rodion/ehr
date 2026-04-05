export enum ActionSeverity {
  URGENT = 'urgent',
  WARNING = 'warning',
  INFO = 'info',
}

export interface Action {
  severity: ActionSeverity;
  title: string;
  meta: string;
  actionLabel: string;
}
