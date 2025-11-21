import React, { useState } from "react";
import styles from "./TagTable.module.css";
import { EmptyState } from "./EmptyState";
import { ColorPicker } from "./ColorPicker";
// import { Tooltip } from "./Tooltip";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagData {
  id: string;
  tag: Tag;
  entitiesTagged: number;
  description: string;
}

interface TagTableProps {
  tags: TagData[];
  showAdminActions?: boolean;
  onTagsChange?: (tags: TagData[]) => void;
}

export const TagTable: React.FC<TagTableProps> = ({
  tags,
  showAdminActions = false,
  onTagsChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [newTagColor, setNewTagColor] = useState("#ff0701");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [localTags, setLocalTags] = useState(tags);

  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState("");
  const [editTagDescription, setEditTagDescription] = useState("");
  const [editTagColor, setEditTagColor] = useState("");
  const [showEditColorPicker, setShowEditColorPicker] = useState<string | null>(
    null
  );
  const [colorPickerAnchor, setColorPickerAnchor] =
    useState<HTMLElement | null>(null);

  // Validation state
  const [isNewTagNameInvalid, setIsNewTagNameInvalid] = useState(false);
  const [isEditTagNameInvalid, setIsEditTagNameInvalid] = useState(false);

  const filteredTags = localTags.filter(
    (tag) =>
      tag.tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdding = () => {
    setIsAddingTag(true);
    setEditingTagId(null);
    setShowEditColorPicker(null);
    setColorPickerAnchor(null);
    setIsNewTagNameInvalid(false);
    setSearchQuery("");
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      setIsNewTagNameInvalid(true);
      return;
    }

    const newTag: TagData = {
      id: Date.now().toString(),
      tag: {
        id: Date.now().toString(),
        name: newTagName,
        color: newTagColor,
      },
      entitiesTagged: 0,
      description: newTagDescription,
    };
    const updatedTags = [newTag, ...localTags];
    setLocalTags(updatedTags);
    onTagsChange?.(updatedTags);
    setNewTagName("");
    setNewTagDescription("");
    setNewTagColor("#D1F4E0");
    setIsAddingTag(false);
    setIsNewTagNameInvalid(false);
  };

  const handleEditTag = (tag: TagData) => {
    setIsAddingTag(false);
    setShowColorPicker(false);
    setColorPickerAnchor(null);
    setEditingTagId(tag.id);
    setEditTagName(tag.tag.name);
    setEditTagDescription(tag.description);
    setEditTagColor(tag.tag.color);
    setIsEditTagNameInvalid(false);
  };

  const handleSaveEdit = () => {
    if (!editTagName.trim()) {
      setIsEditTagNameInvalid(true);
      return;
    }

    if (editingTagId) {
      const updatedTags = localTags.map((tag) =>
        tag.id === editingTagId
          ? {
              ...tag,
              tag: { ...tag.tag, name: editTagName, color: editTagColor },
              description: editTagDescription,
            }
          : tag
      );
      setLocalTags(updatedTags);
      onTagsChange?.(updatedTags);
      setEditingTagId(null);
      setShowEditColorPicker(null);
      setColorPickerAnchor(null);
      setIsEditTagNameInvalid(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setShowEditColorPicker(null);
    setColorPickerAnchor(null);
    setIsEditTagNameInvalid(false);
  };

  const handleDeleteTag = (id: string) => {
    const updatedTags = localTags.filter((tag) => tag.id !== id);
    setLocalTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  return (
    <div className={styles.tableContainer}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <div className={styles.tableHeadTypography}>
          <p className={styles.tableTitle}>Tags</p>
          <p className={styles.tableDescription}>
            Small description what tags is all about
          </p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11.1 11.1"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={tags.length === 0}
            />
          </div>
          {showAdminActions && (
            <button className={styles.addNewButton} onClick={handleStartAdding}>
              Add New Tag
            </button>
          )}
        </div>
      </div>

      {localTags.length === 0 && !isAddingTag ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colTag}>TAG</th>
                <th className={styles.colDescription}>DESCRIPTION</th>
                <th className={styles.colEntities}>ENTITIES TAGGED</th>
                <th className={styles.colActions}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} style={{ padding: 0, borderBottom: "none" }}>
                  <EmptyState description="Looks like your admin hasn't added any tags yet, please talk to them to create new tags" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colTag}>TAG</th>
                <th className={styles.colDescription}>DESCRIPTION</th>
                <th className={styles.colEntities}>ENTITIES TAGGED</th>
                <th className={styles.colActions}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* For Add */}
              {isAddingTag && (
                <tr className={styles.addTagRow}>
                  <td>
                    <div className={styles.tagInputContainer}>
                      <input
                        type="text"
                        placeholder="Enter Tag"
                        value={newTagName}
                        onChange={(e) => {
                          setNewTagName(e.target.value);
                          setIsNewTagNameInvalid(false);
                        }}
                        className={styles.tagInput}
                        style={{
                          borderColor: isNewTagNameInvalid ? "red" : undefined,
                        }}
                      />
                      <div className={styles.colorPickerWrapper}>
                        <button
                          onClick={(e) => {
                            setShowColorPicker(!showColorPicker);
                            setColorPickerAnchor(e.currentTarget);
                          }}
                          className={styles.colorPreview}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <circle cx="10" cy="10" r="10" fill={newTagColor} />
                            <path
                              d="M8.99 14.7105L5.3 11.15C5.2 11.0535 5.125 10.9474 5.075 10.8316C5.025 10.7158 5 10.5952 5 10.4697C5 10.3443 5.025 10.2237 5.075 10.1079C5.125 9.99211 5.2 9.88596 5.3 9.78947L8.75 6.475L7.16 4.94079L8.09 4L14.09 9.78947C14.19 9.88596 14.2625 9.99211 14.3075 10.1079C14.3525 10.2237 14.375 10.3443 14.375 10.4697C14.375 10.5952 14.3525 10.7158 14.3075 10.8316C14.2625 10.9474 14.19 11.0535 14.09 11.15L10.4 14.7105C10.3 14.807 10.19 14.8794 10.07 14.9276C9.95 14.9759 9.825 15 9.695 15C9.565 15 9.44 14.9759 9.32 14.9276C9.2 14.8794 9.09 14.807 8.99 14.7105ZM9.695 7.38684L6.485 10.4842H12.905L9.695 7.38684ZM15.68 15C15.32 15 15.015 14.877 14.765 14.6309C14.515 14.3849 14.39 14.0833 14.39 13.7263C14.39 13.4658 14.4575 13.2197 14.5925 12.9882C14.7275 12.7566 14.88 12.5298 15.05 12.3079L15.68 11.5263L16.34 12.3079C16.5 12.5298 16.65 12.7566 16.79 12.9882C16.93 13.2197 17 13.4658 17 13.7263C17 14.0833 16.87 14.3849 16.61 14.6309C16.35 14.877 16.04 15 15.68 15Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        {showColorPicker && (
                          <ColorPicker
                            onColorSelect={(color) => {
                              setNewTagColor(color);
                              setShowColorPicker(false);
                              setColorPickerAnchor(null);
                            }}
                            selectedColor={newTagColor}
                            onClose={() => {
                              setShowColorPicker(false);
                              setColorPickerAnchor(null);
                            }}
                            anchorEl={colorPickerAnchor}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Description"
                      value={newTagDescription}
                      onChange={(e) => setNewTagDescription(e.target.value)}
                      className={styles.descriptionInput}
                    />
                  </td>
                  <td></td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => setIsAddingTag(false)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddTag}
                        className={styles.doneButton}
                      >
                        Done
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {filteredTags.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: 0, borderBottom: "none" }}>
                    <EmptyState description="No tags found" />
                  </td>
                </tr>
              ) : (
                filteredTags.map((tag) => (
                  <tr key={tag.id}>
                    {/* For Edit */}
                    {editingTagId === tag.id ? (
                      <>
                        <td>
                          <div className={styles.tagInputContainer}>
                            <input
                              type="text"
                              placeholder="Enter Tag"
                              value={editTagName}
                              onChange={(e) => {
                                setEditTagName(e.target.value);
                                setIsEditTagNameInvalid(false);
                              }}
                              className={styles.tagInput}
                              style={{
                                borderColor: isEditTagNameInvalid
                                  ? "red"
                                  : undefined,
                              }}
                            />
                            <div className={styles.colorPickerWrapper}>
                              <button
                                onClick={(e) => {
                                  setShowEditColorPicker(
                                    showEditColorPicker === tag.id
                                      ? null
                                      : tag.id
                                  );
                                  setColorPickerAnchor(e.currentTarget);
                                }}
                                className={styles.colorPreview}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill={editTagColor}
                                  />
                                  <path
                                    d="M8.99 14.7105L5.3 11.15C5.2 11.0535 5.125 10.9474 5.075 10.8316C5.025 10.7158 5 10.5952 5 10.4697C5 10.3443 5.025 10.2237 5.075 10.1079C5.125 9.99211 5.2 9.88596 5.3 9.78947L8.75 6.475L7.16 4.94079L8.09 4L14.09 9.78947C14.19 9.88596 14.2625 9.99211 14.3075 10.1079C14.3525 10.2237 14.375 10.3443 14.375 10.4697C14.375 10.5952 14.3525 10.7158 14.3075 10.8316C14.2625 10.9474 14.19 11.0535 14.09 11.15L10.4 14.7105C10.3 14.807 10.19 14.8794 10.07 14.9276C9.95 14.9759 9.825 15 9.695 15C9.565 15 9.44 14.9759 9.32 14.9276C9.2 14.8794 9.09 14.807 8.99 14.7105ZM9.695 7.38684L6.485 10.4842H12.905L9.695 7.38684ZM15.68 15C15.32 15 15.015 14.877 14.765 14.6309C14.515 14.3849 14.39 14.0833 14.39 13.7263C14.39 13.4658 14.4575 13.2197 14.5925 12.9882C14.7275 12.7566 14.88 12.5298 15.05 12.3079L15.68 11.5263L16.34 12.3079C16.5 12.5298 16.65 12.7566 16.79 12.9882C16.93 13.2197 17 13.4658 17 13.7263C17 14.0833 16.87 14.3849 16.61 14.6309C16.35 14.877 16.04 15 15.68 15Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              {showEditColorPicker === tag.id && (
                                <ColorPicker
                                  onColorSelect={(color) => {
                                    setEditTagColor(color);
                                    setShowEditColorPicker(null);
                                    setColorPickerAnchor(null);
                                  }}
                                  selectedColor={editTagColor}
                                  onClose={() => {
                                    setShowEditColorPicker(null);
                                    setColorPickerAnchor(null);
                                  }}
                                  anchorEl={colorPickerAnchor}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Description"
                            value={editTagDescription}
                            onChange={(e) =>
                              setEditTagDescription(e.target.value)
                            }
                            className={styles.descriptionInput}
                          />
                        </td>
                        <td className={styles.entitiesCell}>
                          {tag.entitiesTagged}
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              onClick={handleCancelEdit}
                              className={styles.cancelButton}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveEdit}
                              className={styles.doneButton}
                            >
                              Done
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <div className={styles.tagOption}>
                            <div
                              className={styles.tagLabel}
                              style={{ backgroundColor: tag.tag.color }}
                            >
                              {tag.tag.name}
                            </div>
                          </div>
                        </td>
                        <td className={styles.descriptionCell}>
                          {/* <Tooltip text={tag.description} /> */}
                          <span className={styles.truncatedText}>
                            {tag.description}
                          </span>
                        </td>
                        <td className={styles.entitiesCell}>
                          {tag.entitiesTagged}
                        </td>
                        <td>
                          <div className={styles.actionIcons}>
                            <button
                              onClick={() => handleEditTag(tag)}
                              className={styles.editButton}
                              disabled={!showAdminActions}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M1.77778 14.2222H3.04444L11.7333 5.53333L10.4667 4.26667L1.77778 12.9556V14.2222ZM0 16V12.2222L11.7333 0.511111C11.9111 0.348148 12.1074 0.222222 12.3222 0.133333C12.537 0.0444444 12.763 0 13 0C13.237 0 13.4667 0.0444444 13.6889 0.133333C13.9111 0.222222 14.1037 0.355556 14.2667 0.533333L15.4889 1.77778C15.6667 1.94074 15.7963 2.13333 15.8778 2.35556C15.9593 2.57778 16 2.8 16 3.02222C16 3.25926 15.9593 3.48519 15.8778 3.7C15.7963 3.91481 15.6667 4.11111 15.4889 4.28889L3.77778 16H0ZM11.0889 4.91111L10.4667 4.26667L11.7333 5.53333L11.0889 4.91111Z"
                                  fill={
                                    showAdminActions ? "#0D4CBE" : "#D1D5DB"
                                  }
                                />
                              </svg>
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeleteTag(tag.id)}
                              disabled={!showAdminActions}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="16"
                                viewBox="0 0 12 16"
                                fill="none"
                              >
                                <path
                                  d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V3.55556H0.857143V14.2222ZM12 0.888889H9L8.14286 0H3.85714L3 0.888889H0V2.66667H12V0.888889Z"
                                  fill={
                                    showAdminActions ? "#E33946" : "#D1D5DB"
                                  }
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
