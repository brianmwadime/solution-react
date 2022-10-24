import React from 'react';
import styles from "./noContent.module.css";

interface Props {
    title?: any;
    subtext?: any;
    icon?: string;
    iconSize?: number;
    size?: string;
    show?: boolean;
    children?: any;
    image?: any;
    style?: any;
}
export default function NoContent(props: Props) {
    const { title = '', subtext = '', size, show, children, image, style } = props;

    return !show ? (
        null
    ) : (
        // <div className={`${styles.wrapper} ${size && styles[size]}`} style={style}>
         <div className="flex items-center justify-center flex-col my-[20px]" style={style}>
            <img src="images/no_content.svg" style={{width: "170px"}} alt="No content available" />
            {title && <div className="title">{title}</div>}
            {subtext && <div className="subtext">{subtext}</div>}
            {image && <div className="mt-4 flex justify-center">{image} </div>}
        </div>
    );
}
