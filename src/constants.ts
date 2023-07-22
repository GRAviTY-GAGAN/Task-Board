export interface UserObjSignUpType extends UserObjType {
  firstName: string;
  lastName?: string;
}

export type UserObjType = {
  email: string;
  password: string | number;
};

export interface SubtaskObjType {
  subTaskID: string;
  task: string;
  status: boolean;
}
