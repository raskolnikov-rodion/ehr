export interface GroupItem {
  label: string;
  var: string;
}

export interface ColorGroup {
  title: string;
  swatches: GroupItem[];
}

export interface TypeSample {
  label: string;
  var: string;
  family: string;
  weight: string;
  sample: string;
}
