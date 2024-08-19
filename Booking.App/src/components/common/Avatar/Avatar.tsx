import '../../../css/AvatarClasses/index.scss';

interface IAvatar {
    userName: string
}
export const Avatar = (info: IAvatar) => {
    return (
        <div className="avatar">
            {info.userName[0]}
        </div>
    )
}