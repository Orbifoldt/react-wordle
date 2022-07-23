import './tile.css'

interface TileProps {
    state?: "default" | "yellow" | "green"
    value: string
}

const Tile = ({
    state="default",
    value
}: TileProps): JSX.Element => (<div className={["tile", `tile--${state}`].join(" ")}>{value}</div>)

export default Tile