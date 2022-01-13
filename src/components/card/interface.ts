export type MemberType = {
  name: string;
  workHours?: number;
  occupyHours?: number;
  avatar?: string;
  color?: string;
};

export type CardDataItem = {
  name: string;
  consumeTime?: number;
  otherTime?: number;
  members?: Array<MemberType>;
};
