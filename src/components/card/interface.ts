export type MemberType = {
  name: string;
  workHours?: number;
  occupyHours?: number;
  color?: string;
};

export type CardDataItem = {
  name: string;
  consumeTime?: number;
  otherTime?: number;
  avatar?: string;
  avatarColor?: string;
  members?: Array<MemberType>;
};
