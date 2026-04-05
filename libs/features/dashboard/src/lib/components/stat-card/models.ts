export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  NEUTRAL = 'neutral',
}

export interface Statistic {
  label: string;
  value: string;
  trend: string;
  trendDirection: TrendDirection;
  iconUrl: string;
}
