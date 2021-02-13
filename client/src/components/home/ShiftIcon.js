import {ReactComponent as ArrowIcon} from "../../assets/right-arrow.svg";

function ShiftIcon({direction}) {
    return (
        <div>
            <ArrowIcon style={{"transform": `rotate(${direction=="left" ? 0 : 180}deg)`}} />
        </div>
    )
}

export default ShiftIcon;