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
  title = "Title",
  description = "Description...",
  onTagsChange,
  onManage,
  isOpen = false,
  onClose,
}) => {
  const [localSelected, setLocalSelected] = useState<Tag[]>(selectedTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) setLocalSelected(selectedTags);
  }, [isOpen, selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose?.();
        return;
      }

      const clickedDropdown = dropdownRef.current?.contains(target) ?? false;

      const clickedToggleButton =
        toggleButtonRef.current?.contains(target) ?? false;

      if (isDropdownOpen && !clickedDropdown && !clickedToggleButton) {
        setIsDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isDropdownOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setLocalSelected(selectedTags);
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  }, [isOpen, selectedTags]);

  const handleToggleTag = (tag: Tag) => {
    setLocalSelected((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const handleRemoveTag = (tagId: string) => {
    setLocalSelected((prev) => prev.filter((t) => t.id !== tagId));
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    onTagsChange?.(localSelected);
    onClose?.();
  };

  const handleClose = () => {
    setLocalSelected(selectedTags);
    setSearchQuery("");
    setIsDropdownOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.selectedSection}>
          <h3 className={styles.sectionTitle}>SELECTED TAGS</h3>
          <div className={styles.selectedTags}>
            {localSelected.length === 0 ? (
              <p className={styles.emptyMessage}>No tags selected</p>
            ) : (
              localSelected.map((tag) => (
                <div
                  key={tag.id}
                  className={styles.selectedTag}
                  style={{ backgroundColor: tag.color }}
                >
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    {tag.name}
                  </span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveTag(tag.id)}
                    aria-label="Remove tag"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M4.48 10.5L7 7.98L9.52 10.5L10.5 9.52L7.98 7L10.5 4.48L9.52 3.5L7 6.02L4.48 3.5L3.5 4.48L6.02 7L3.5 9.52L4.48 10.5ZM7 14C6.03167 14 5.12167 13.8163 4.27 13.4488C3.41833 13.0813 2.6775 12.5825 2.0475 11.9525C1.4175 11.3225 0.91875 10.5817 0.55125 9.73C0.18375 8.87833 0 7.96833 0 7C0 6.03167 0.18375 5.12167 0.55125 4.27C0.91875 3.41833 1.4175 2.6775 2.0475 2.0475C2.6775 1.4175 3.41833 0.91875 4.27 0.55125C5.12167 0.18375 6.03167 0 7 0C7.96833 0 8.87833 0.18375 9.73 0.55125C10.5817 0.91875 11.3225 1.4175 11.9525 2.0475C12.5825 2.6775 13.0813 3.41833 13.4488 4.27C13.8163 5.12167 14 6.03167 14 7C14 7.96833 13.8163 8.87833 13.4488 9.73C13.0813 10.5817 12.5825 11.3225 11.9525 11.9525C11.3225 12.5825 10.5817 13.0813 9.73 13.4488C8.87833 13.8163 7.96833 14 7 14Z"
                        fill="white"
                      />
                    </svg>
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
              ref={toggleButtonRef}
              className={styles.selectButton}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Select
              <span
                className={`${styles.arrow} ${
                  isDropdownOpen ? styles.arrowUp : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                >
                  <path
                    d="M8 0.943334L7.05667 0L4 3.05667L0.943334 0L-2.38419e-07 0.943334L4 4.94334L8 0.943334Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>

            {isDropdownOpen && (
              <div ref={dropdownRef} className={styles.dropdown}>
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
                  {filteredTags
                    .sort((a, b) => {
                      if (localSelected.some((t) => t.id === a.id)) return -1;
                      if (localSelected.some((t) => t.id === b.id)) return 1;
                      return 0;
                    })
                    .map((tag) => {
                      const isSelected = localSelected.some(
                        (t) => t.id === tag.id
                      );
                      return (
                        <label key={tag.id} className={styles.tagOption}>
                          <input
                            name={tag.id}
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
        <div className={styles.actionable}>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
