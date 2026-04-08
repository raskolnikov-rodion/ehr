export type AvatarColor = 'blue' | 'teal' | 'amber' | 'green' | 'gray';

export interface Patient {
  initials: string;
  avatarColor: AvatarColor;
  name: string;
  detail: string;
  lastVisit: string;
}
