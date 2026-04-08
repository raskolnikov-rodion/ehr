export type TrendDirection = 'up' | 'down' | 'neutral';
export interface Statistic {
  label: string;
  value: string;
  trend: string;
  trendDirection: TrendDirection;
  iconUrl: string;
}
