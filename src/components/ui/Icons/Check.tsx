import { IconProps } from "@/types/icon-props.types"

const Check = ({ className, w, h }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={`${w ?? "24"}`}
            height={`${h ?? "24"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-check ${className ?? ""}`}
        >
            <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
            />
            <path
                d="M5 12l5 5l10 -10"
            />
        </svg>
    )
}

export default Check