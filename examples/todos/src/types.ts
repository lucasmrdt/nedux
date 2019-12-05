export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export enum Filter {
  ShowAll,
  ShowCompleted,
  ShowActive,
}
