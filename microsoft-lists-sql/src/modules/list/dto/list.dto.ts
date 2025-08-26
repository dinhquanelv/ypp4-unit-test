export class ListDto {
  listId: number;
  color: string;
  icon: string;
  workspaceName: string;
  listName: string;
  accessedAt?: Date;
  isFavoriteList?: boolean;
}
