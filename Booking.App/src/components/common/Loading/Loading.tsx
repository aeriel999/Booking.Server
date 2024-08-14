import '../../../css/LoadingClasses/insex.scss';
import { ThreeDots } from 'react-loader-spinner';

export const Loading = () => {
    return (
        <div id="loading">
            <ThreeDots
                visible={true}
                color='#00c2c1'
                radius={9}
            />
        </div>
    );
}