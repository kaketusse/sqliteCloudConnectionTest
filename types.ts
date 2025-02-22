export type EventDBType = {
  id: number;
  name: string;
  date: string;
  nbmaxparticipants: number | null;
  nbparticipants: number;
  isliked: boolean;
  createdat: string;
  colorname: string | null;
  labelname: string | null;
};

export type GetPersonsDBDataType = {
  id: number;
  email: string;
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
}[];
