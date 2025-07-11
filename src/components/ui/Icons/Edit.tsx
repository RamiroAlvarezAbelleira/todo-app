import { IconProps } from "@/types/icon-props.types"

const Edit = ({ className, w, h }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${w ?? "24"}`}
            height={`${h ?? "24"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-pencil ${className ?? ""}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
        </svg>
    )
}

export default Edit