import { useEffect, useRef, useState } from "react";
import styles from "./TagTable.module.css";

interface TooltipProps {
  text: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, className }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const { scrollWidth, clientWidth } = textRef.current;
        setIsTruncated(scrollWidth > clientWidth);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [text]);

  return (
    <div className={styles.tooltipContainer}>
      <span
        ref={textRef}
        className={`${styles.truncatedText} ${className || ""}`}
      >
        {text}
      </span>
      {isTruncated && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};
