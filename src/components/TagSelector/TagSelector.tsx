import React, { useState, useRef, useEffect } from "react";
import styles from "./TagSelector.module.css";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags?: Tag[];
  title?: string;
  description?: string;
  onTagsChange?: (tags: Tag[]) => void;
  onManage?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  availableTags,
  selectedTags = [],
  title = "Add tags",
  description = "Description as to what this means",
  onTagsChange,
  onManage,
  isOpen = false,
  onClose,
}) => {
  const [selected, setSelected] = useState<Tag[]>(selectedTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleToggleTag = (tag: Tag) => {
    const isSelected = selected.some((t) => t.id === tag.id);
    let newSelected: Tag[];

    if (isSelected) {
      newSelected = selected.filter((t) => t.id !== tag.id);
    } else {
      newSelected = [...selected, tag];
    }

    setSelected(newSelected);
    onTagsChange?.(newSelected);
  };

  const handleRemoveTag = (tagId: string) => {
    const newSelected = selected.filter((t) => t.id !== tagId);
    setSelected(newSelected);
    onTagsChange?.(newSelected);
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.selectedSection}>
          <h3 className={styles.sectionTitle}>SELECTED TAGS</h3>
          <div className={styles.selectedTags}>
            {selected.length === 0 ? (
              <p className={styles.emptyMessage}>No tags selected</p>
            ) : (
              selected.map((tag) => (
                <div
                  key={tag.id}
                  className={styles.selectedTag}
                  style={{ backgroundColor: tag.color }}
                >
                  <span>{tag.name}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveTag(tag.id)}
                    aria-label="Remove tag"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.addSection}>
          <h3 className={styles.sectionTitle}>ADD TAGS</h3>

          <div className={styles.controls}>
            <button
              className={styles.selectButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Select
              <span
                className={`${styles.arrow} ${
                  isDropdownOpen ? styles.arrowUp : ""
                }`}
              >
                ▲
              </span>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {onManage && (
                    <button className={styles.manageButton} onClick={onManage}>
                      Manage
                    </button>
                  )}
                </div>

                <div className={styles.tagList}>
                  {filteredTags.map((tag) => {
                    const isSelected = selected.some((t) => t.id === tag.id);
                    return (
                      <label key={tag.id} className={styles.tagOption}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleTag(tag)}
                          className={styles.checkbox}
                        />
                        <div
                          className={styles.tagLabel}
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
