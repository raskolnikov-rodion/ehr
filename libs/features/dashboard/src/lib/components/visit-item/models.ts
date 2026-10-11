export type AvatarColor = 'blue' | 'teal' | 'amber' | 'green' | 'gray';

export interface VisitView {
  patientInitials: string;
  avatarColor: AvatarColor;
  patientName: string;
  detail: string;
  lastVisit: string;
}
