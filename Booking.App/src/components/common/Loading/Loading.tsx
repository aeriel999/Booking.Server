import "../../../css/LoadingClasses/insex.scss";
import { ThreeDots } from "react-loader-spinner";
import "../../../css/DashBoardRealtorClasses/index.scss";

type LoadingProps = {
    className?: string;
};

export const Loading = (props: LoadingProps) => {
    return (
        <div className={props.className ? props.className : "loading"}>
            <ThreeDots visible={true} color="#00c2c1" radius={9} />
        </div>
    );
};
