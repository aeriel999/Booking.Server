import {AsyncThunk} from '@reduxjs/toolkit';
import { IDeleteImage, IRoom } from '../../interfaces/post';

// eslint-disable-next-line
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

export type RoomsProps = {
    rooms: IRoom[] | null;
    setRooms: (rooms: IRoom[]) => void;
    label: string;
    formName: string;
};

export type EditImageUploaderType = {
    image: File | null | undefined;
    setImage: (file: File) => void;
    validator: (value: File) => string | false | undefined;
    label: string;
    defaultImageUrl: string;
    onImageDelete: (images: IDeleteImage[]) => void;
}; 

export type ListImageUploaderProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    validator: (value: File[]) => string | false | undefined;
};

export type ImageUploaderProps = {
    image: File | null | undefined;
    setImage: (file: File) => void;
    validator: (value: File) => string | false | undefined;
    label: string;
};

export type OutlinedAlertsProps = {
    message: string;
    textColor?: string;
};

export type EditListImagesUploaderProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    defaultImageUrls: string[]; // List of default images
    onImageDelete: (deletedImages: IDeleteImage[]) => void;
    validator: (value: File[]) => string | false | undefined;
};