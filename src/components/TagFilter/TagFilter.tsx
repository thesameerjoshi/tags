import React, { useState, useRef, useEffect } from "react";
import styles from "./TagFilter.module.css";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface TagFilterProps {
  tags: Tag[];
  onManageTags?: () => void;
  onChange?: (selectedTag: Tag | null) => void;
  buttonLabel?: string;
  children?: React.ReactNode;
  popoverWidth?: string | number;
  matchTriggerWidth?: boolean;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  onManageTags,
  onChange,
  buttonLabel = "Tags",
  children,
  popoverWidth,
  matchTriggerWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleTagClick = (tag: Tag) => {
    const newSelection = selectedTag?.id === tag.id ? null : tag;
    setSelectedTag(newSelection);
    onChange?.(newSelection);
    setIsOpen(!isOpen);
  };

  const getPopoverStyle = () => {
    const style: React.CSSProperties = {};

    if (matchTriggerWidth && triggerRef.current) {
      style.width = triggerRef.current.offsetWidth;
    } else if (popoverWidth) {
      style.width = popoverWidth;
    }

    return style;
  };

  return (
    <div className={styles.container}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={!children ? styles.triggerWrapper : undefined}
      >
        {children ? (
          children
        ) : (
          <button className={styles.triggerButton}>
            {buttonLabel}
            <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
              ▼
            </span>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={styles.popover}
          style={getPopoverStyle()}
        >
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`${styles.tagButton} ${
                    selectedTag?.id === tag.id ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: tag.color }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            {onManageTags && (
              <div className={styles.footer}>
                <button className={styles.manageButton} onClick={onManageTags}>
                  Manage Tags
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
