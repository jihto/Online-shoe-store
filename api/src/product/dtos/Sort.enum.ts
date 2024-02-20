import { SortOrder } from "mongoose";

export enum SortType {
    Empty = '',
    Name = 'name',
    CreateAt = 'createAt' 
} 

export interface Sorting{
    type: SortType;
    value: SortOrder;
}