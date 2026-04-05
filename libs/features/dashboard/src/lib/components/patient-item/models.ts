export enum AvatarColor {
  BLUE = 'blue',
  TEAL = 'teal',
  AMBER = 'amber',
  GREEN = 'green',
  GRAY = 'gray',
}

export interface Patient {
  initials: string;
  avatarColor: AvatarColor;
  name: string;
  detail: string;
  lastVisit: string;
}
