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
}

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  onManageTags,
  onChange,
  buttonLabel = "Tags",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
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
  };

  const handleSelectAll = () => {
    setSelectedTag(null);
    onChange?.(null);
  };

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        className={styles.triggerButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonLabel}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div ref={popoverRef} className={styles.popover}>
          <div className={styles.header}>
            <h3 className={styles.title}>{buttonLabel}</h3>
          </div>

          <div className={styles.content}>
            <button
              className={`${styles.tagButton} ${
                !selectedTag ? styles.selected : ""
              }`}
              onClick={handleSelectAll}
            >
              All
            </button>

            {tags.map((tag) => (
              <button
                key={tag.id}
                className={`${styles.tagButton} ${
                  selectedTag?.id === tag.id ? styles.selected : ""
                }`}
                style={{
                  backgroundColor: tag.color,
                }}
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
      )}
    </div>
  );
};
