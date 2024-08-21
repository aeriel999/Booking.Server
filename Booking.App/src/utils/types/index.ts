import {AsyncThunk} from '@reduxjs/toolkit';
import { IRoom } from '../../interfaces/post';

// eslint-disable-next-line
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

export type RoomsProps = {
    rooms: IRoom[] | null;
    setRooms: (rooms: IRoom[]) => void;
    label: string;
    formName: string;
};