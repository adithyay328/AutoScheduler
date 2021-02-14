import {ReactComponent as ArrowIcon} from "../../assets/right-arrow.svg";

function ShiftIcon({direction, onClick}) {
    return (
        <div onClick={onClick} style={{display: "flex", justifyContent: "center", alignItems: "center", padding:"0.3em", borderRadius:"5px", border: "1px solid gray", cursor: "pointer"}}>
            <ArrowIcon style={{transform: `rotate(${direction=="left" ? 0 : 180}deg) scale(0.5)`}} />
        </div>
    )
}

export default ShiftIcon;