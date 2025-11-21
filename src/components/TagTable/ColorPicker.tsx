import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TAG_COLORS } from "../../types/color";
import styles from "./TagTable.module.css";

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorSelect,
  selectedColor,
  onClose,
  anchorEl,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPosition({
        top: rect.bottom + scrollTop + 8,
        left: rect.left + scrollLeft,
      });
    }
  }, [anchorEl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", onClose, true); // Close on scroll
    window.addEventListener("resize", onClose); // Close on resize

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [onClose, anchorEl]);

  if (!anchorEl) return null;

  return createPortal(
    <div
      className={styles.colorPicker}
      ref={pickerRef}
      style={{
        top: position.top,
        left: position.left,
        position: "absolute",
      }}
    >
      {TAG_COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={styles.colorButton}
          style={{
            backgroundColor: color,
            border: color === selectedColor ? "1px solid #fffff" : "none",
          }}
        />
      ))}
    </div>,
    document.body
  );
};
