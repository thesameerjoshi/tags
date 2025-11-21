import React, { useState, useRef, useEffect } from "react";
import styles from "./TagTable.module.css";
import { TAG_COLORS } from "../../types/color";

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

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorSelect,
  selectedColor,
  onClose,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.colorPicker} ref={pickerRef}>
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
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className={styles.emptyState}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="46"
      viewBox="0 0 96 46"
      fill="none"
    >
      <path
        d="M79.6635 42.508L78.9445 42.3416C78.3017 42.1922 77.6555 42.597 77.5072 43.2433C77.359 43.889 77.7627 44.533 78.409 44.6806L79.115 44.8447C79.2076 44.8664 79.2996 44.8763 79.3904 44.8763C79.9348 44.8763 80.4275 44.5037 80.5576 43.9506C80.7088 43.3054 80.3086 42.6591 79.6635 42.508Z"
        fill="black"
      />
      <path
        d="M75.5091 41.6066L75.365 41.5779C74.7117 41.4484 74.0835 41.8732 73.9552 42.5225C73.8269 43.1729 74.2494 43.8039 74.8997 43.9322L75.038 43.9598C75.1177 43.9756 75.1968 43.9832 75.2747 43.9832C75.8349 43.9832 76.3365 43.5889 76.4501 43.0188C76.5802 42.3689 76.1589 41.7367 75.5091 41.6066Z"
        fill="black"
      />
      <path
        d="M94.7309 40.916C92.5014 40.4941 90.1892 40.1307 87.8238 39.8182C87.8665 39.1495 87.6737 38.4956 87.2525 37.923L70.8938 15.7246C70.8157 15.5126 70.698 15.3136 70.5029 15.1693C70.4914 15.1608 70.48 15.1559 70.4685 15.1474L65.2646 8.08594C63.699 5.96191 60.9381 4.69395 57.8783 4.69336C57.8777 4.69336 57.8777 4.69336 57.8777 4.69336C54.818 4.69336 52.0559 5.96191 50.4902 8.08594L28.5035 37.9225C28.208 38.323 28.032 38.7649 27.9613 39.2224C27.0102 39.2873 26.0901 39.356 25.1965 39.4278V31.0131H30.4137C32.9924 31.0131 35.0906 28.9219 35.0906 26.3514V16.9307C35.0906 15.0785 33.6873 13.5211 31.8832 13.384C30.8736 13.3172 29.9004 13.6881 29.2131 14.39C28.5592 15.0416 28.1994 15.9041 28.1994 16.8176V23.8348H25.1965V15.9551C25.1965 14.1252 24.4816 12.3979 23.1744 11.0818C21.8637 9.79043 20.1316 9.07969 18.2977 9.07969C14.4932 9.07969 11.3982 12.1641 11.3982 15.9551V19.2949H8.09941V10.8475C8.09941 9.76523 7.67871 8.7498 6.91348 7.98691C6.21445 7.29258 5.28516 6.8748 4.28613 6.81152C3.21094 6.75352 2.15918 7.14375 1.3459 7.91367C0.49043 8.72285 0 9.85898 0 11.0291V23.707C0 26.3525 2.15918 28.5047 4.81348 28.5047H11.3982V40.9248C11.3982 40.9381 11.4054 40.9491 11.4059 40.9624C9.00857 41.3123 7.63696 41.5635 7.61191 41.5682C6.96035 41.6889 6.52969 42.3152 6.65039 42.9668C6.75762 43.5445 7.26211 43.9482 7.8293 43.9482C7.90195 43.9482 7.97519 43.9418 8.04902 43.9283C8.09473 43.9195 12.726 43.0693 20.0467 42.3082C20.7059 42.2397 21.1846 41.6496 21.116 40.9904C21.0475 40.3307 20.4533 39.8508 19.7982 39.9211C17.5241 40.1574 15.5076 40.4026 13.7982 40.6293V27.3047C13.7982 26.642 13.2609 26.1047 12.5982 26.1047H4.81348C3.48281 26.1047 2.4 25.0289 2.4 23.707V11.0291C2.4 10.5152 2.61738 10.0148 2.9959 9.65625C3.32578 9.34395 3.74238 9.19102 4.14434 9.20742C4.55215 9.2332 4.93477 9.4043 5.22012 9.68848C5.52949 9.99609 5.69941 10.408 5.69941 10.8475V20.4949C5.69941 21.1576 6.23672 21.6949 6.89941 21.6949H12.5982C13.2609 21.6949 13.7982 21.1576 13.7982 20.4949V15.9551C13.7982 13.4871 15.8168 11.4797 18.2977 11.4797C19.4971 11.4797 20.6314 11.9455 21.4811 12.7822C22.3295 13.6365 22.7965 14.7633 22.7965 15.9551V25.0348C22.7965 25.6975 23.3338 26.2348 23.9965 26.2348H29.3994C30.0621 26.2348 30.5994 25.6975 30.5994 25.0348V16.8176C30.5994 16.5463 30.709 16.2879 30.9176 16.0799C31.0658 15.9275 31.3207 15.7494 31.7139 15.7781C32.2523 15.8191 32.6906 16.3359 32.6906 16.9307V26.3514C32.6906 27.5982 31.6693 28.6131 30.4137 28.6131H23.9965C23.3338 28.6131 22.7965 29.1504 22.7965 29.8131V39.7898C22.7965 39.9627 22.8362 40.1249 22.902 40.2734C22.8297 40.4462 22.784 40.6314 22.8012 40.8311C22.8574 41.4908 23.4369 41.9906 24.099 41.9238C26.5758 41.7113 29.3219 41.5203 32.2578 41.3735C32.102 41.3985 31.9359 41.4237 31.7824 41.4486C31.1279 41.5553 30.6844 42.1717 30.791 42.8256C30.8865 43.4145 31.3957 43.8328 31.974 43.8328C32.0379 43.8328 32.1029 43.8281 32.168 43.817C37.9006 42.8829 45.2621 41.9186 53.5184 41.3693C59.4314 41.683 65.563 42.29 71.6637 43.3365C71.7322 43.3482 71.8002 43.3535 71.8676 43.3535C72.4412 43.3535 72.9486 42.941 73.0494 42.3563C73.157 41.7281 72.7495 41.1422 72.1378 40.9971C73.7689 41.0453 75.4085 41.1092 77.0607 41.2066C77.7252 41.2518 78.29 40.7414 78.3293 40.0799C78.3685 39.4178 77.8641 38.85 77.2025 38.8113C68.9213 38.3224 60.866 38.4808 53.5089 38.9651C45.2079 38.5309 37.3591 38.6752 30.6508 39.0546L47.1341 16.6865C47.2107 16.6633 47.2898 16.6562 47.3631 16.6166C49.4432 15.4957 50.2049 16.2088 50.9414 16.899L51.068 17.0162C51.2373 17.1727 51.3322 17.3033 51.416 17.4152C51.6146 17.6801 51.8877 18.0439 52.4789 18.3293C52.9219 18.5426 53.3496 18.6264 53.7586 18.6264C54.5988 18.6264 55.3611 18.2736 56.0156 17.9707C56.809 17.6045 57.5607 17.2594 58.5047 17.3303C59.0906 17.3748 59.3355 17.5342 59.7059 17.7756C60.1922 18.0926 60.8637 18.5297 62.0355 18.4453C63.4307 18.3504 64.2984 17.6414 64.9951 17.0719C65.6086 16.5709 65.9848 16.2832 66.5789 16.2094C67.2384 16.1288 67.9798 16.3754 68.7855 16.9096L85.3201 39.3463C85.3711 39.4155 85.3882 39.4678 85.4046 39.5178C84.2029 39.3806 82.991 39.2549 81.7658 39.1465C81.099 39.0949 80.523 39.5766 80.4644 40.2357C80.4059 40.8961 80.8939 41.4785 81.5537 41.5371C85.9799 41.9291 90.2631 42.5133 94.2844 43.2738C94.36 43.2885 94.435 43.2949 94.5088 43.2949C95.0742 43.2949 95.5775 42.8936 95.6865 42.3182C95.8102 41.6666 95.3818 41.0391 94.7309 40.916ZM66.283 13.8281C64.9734 13.991 64.1432 14.6689 63.4769 15.2139C62.8559 15.7207 62.475 16.0102 61.8727 16.0512C61.4982 16.0711 61.384 16.0043 61.0154 15.7646C60.5385 15.4541 59.8857 15.0287 58.6875 14.9373C57.1201 14.816 55.9465 15.3574 55.0078 15.7928C54.1693 16.1812 53.8236 16.3119 53.5213 16.1678C53.4568 16.1361 53.4568 16.1361 53.3355 15.975C53.2002 15.7939 53.0145 15.5461 52.6939 15.2514L52.582 15.1471C52.0411 14.6406 51.0214 13.6963 49.3761 13.644L52.4227 9.50977C53.5377 7.99687 55.5768 7.09336 57.8777 7.09336C57.8777 7.09336 57.8777 7.09336 57.8783 7.09336C60.1787 7.09336 62.2178 7.99687 63.3322 9.50977L66.5128 13.8256C66.4365 13.8313 66.359 13.8187 66.283 13.8281Z"
        fill="black"
      />
      <path
        d="M28.7672 41.9618L28.3412 42.0386C27.689 42.1569 27.2566 42.7815 27.375 43.4337C27.4799 44.0132 27.9855 44.4192 28.5545 44.4192C28.6254 44.4192 28.6974 44.4134 28.7701 44.3999L29.1914 44.3243C29.8435 44.2071 30.2777 43.5831 30.1605 42.931C30.0433 42.2782 29.4164 41.8435 28.7672 41.9618Z"
        fill="black"
      />
      <path
        d="M24.8982 42.6941C23.4779 42.9812 22.7079 43.1588 22.7079 43.1588C22.0622 43.3082 21.6597 43.9527 21.8091 44.5984C21.9368 45.1533 22.4308 45.5283 22.9769 45.5283C23.0665 45.5283 23.1573 45.5183 23.2482 45.4978C23.2575 45.4955 24.004 45.3232 25.3739 45.0461C26.0238 44.9148 26.4439 44.282 26.312 43.6322C26.1808 42.9824 25.5521 42.5623 24.8982 42.6941Z"
        fill="black"
      />
      <path
        d="M25.9834 7.72493C27.0417 6.67141 27.7911 6.67141 28.8493 7.72493C29.0743 7.94875 29.3784 8.07473 29.6959 8.07473C30.3751 8.07473 30.91 7.75188 31.3823 7.46711C32.185 6.9843 32.4833 6.805 33.4084 7.72493C33.6428 7.95813 33.9487 8.07473 34.2551 8.07473C34.5633 8.07473 34.8709 7.95696 35.1053 7.72141C35.5729 7.25149 35.5717 6.49211 35.1018 6.02454C32.8489 3.7804 31.0219 4.88254 30.143 5.41165C30.0909 5.44329 30.0305 5.47961 29.9708 5.51536C28.1268 4.0634 26.0883 4.23215 24.2901 6.02454C23.8202 6.49211 23.819 7.25207 24.2866 7.72141C24.7542 8.19192 25.5147 8.19192 25.9834 7.72493Z"
        fill="black"
      />
      <path
        d="M38.5213 3.18469C39.5777 2.13118 40.3272 2.13 41.3871 3.18469C41.6115 3.40852 41.9162 3.5345 42.2338 3.5345C42.9129 3.5345 43.4484 3.21164 43.9207 2.92688C44.7217 2.44407 45.0217 2.26418 45.9469 3.18469C46.1813 3.41789 46.4871 3.5345 46.7936 3.5345C47.1018 3.5345 47.4094 3.41672 47.6438 3.18118C48.1113 2.71125 48.1102 1.95188 47.6402 1.4843C45.3879 -0.758081 43.5604 0.342896 42.6814 0.871412C42.6293 0.903052 42.5684 0.93938 42.5092 0.975123C40.6647 -0.47683 38.625 -0.307495 36.8279 1.4843C36.358 1.95188 36.3568 2.71184 36.8244 3.18118C37.2926 3.65168 38.052 3.65285 38.5213 3.18469Z"
        fill="black"
      />
      <path
        d="M72.4881 4.54685C73.2363 3.80212 73.6928 3.80095 74.4422 4.54685C74.6672 4.77068 74.9713 4.89665 75.2889 4.89665C75.8988 4.89665 76.3775 4.60778 76.7625 4.37634C77.3854 3.99958 77.4814 3.94216 78.0897 4.54685C78.5602 5.01501 79.3195 5.01267 79.7865 4.54333C80.2541 4.074 80.2529 3.31403 79.783 2.84646C77.8482 0.918725 76.2199 1.90075 75.5232 2.32087C73.9898 1.20466 72.2672 1.38103 70.7947 2.84646C70.3248 3.31403 70.3236 4.07341 70.7912 4.54333C71.2594 5.01325 72.0188 5.0156 72.4881 4.54685Z"
        fill="black"
      />
      <path
        d="M77.8793 10.4959C76.6049 9.64336 75.1869 9.82324 73.9699 11.0338C73.5 11.5014 73.4988 12.2613 73.9664 12.7307C74.4345 13.2006 75.1939 13.2029 75.6633 12.7342C76.1508 12.249 76.3482 12.249 76.8357 12.7342C77.0601 12.958 77.3648 13.084 77.6824 13.084C78.2332 13.084 78.6603 12.8262 78.9726 12.6381C79.0834 12.5713 79.2691 12.4594 79.3178 12.4488C79.3189 12.4494 79.4472 12.4811 79.7021 12.7342C80.172 13.2023 80.9314 13.2 81.399 12.7307C81.8666 12.2607 81.8648 11.5014 81.3955 11.0338C79.8638 9.50859 78.5109 10.1314 77.8793 10.4959Z"
        fill="black"
      />
      <path
        d="M85.6418 8.75799C85.9482 8.75799 86.2541 8.64139 86.4885 8.40819C87.542 7.36053 88.323 7.3617 89.3742 8.40819C89.5992 8.63202 89.9033 8.75799 90.2209 8.75799C90.9011 8.75799 91.4385 8.43397 91.9125 8.14862C92.7193 7.6617 93.0211 7.48006 93.9533 8.40819C94.4232 8.87635 95.1826 8.87401 95.6502 8.40467C96.1178 7.93475 96.1166 7.17537 95.6467 6.7078C93.3849 4.45604 91.5527 5.56229 90.6726 6.09315C90.6199 6.12537 90.5578 6.16287 90.4963 6.1992C88.6476 4.74198 86.601 4.91014 84.7951 6.7078C84.3252 7.17537 84.324 7.93534 84.7916 8.40467C85.026 8.64022 85.3336 8.75799 85.6418 8.75799Z"
        fill="black"
      />
      <path
        d="M41.6795 9.27258C40.3459 8.36086 38.8606 8.54074 37.5879 9.80813C37.118 10.2757 37.1168 11.0357 37.5844 11.505C38.052 11.9749 38.8126 11.9773 39.2813 11.5085C39.8297 10.9624 40.0811 10.9648 40.6272 11.5085C40.8522 11.7323 41.1563 11.8583 41.4739 11.8583C42.0376 11.8583 42.4811 11.5911 42.8051 11.396C42.9252 11.3234 43.1497 11.188 43.2188 11.1857C43.22 11.1857 43.3659 11.2085 43.667 11.5085C43.9014 11.7417 44.2073 11.8583 44.5137 11.8583C44.8219 11.8583 45.1295 11.7405 45.3639 11.505C45.8315 11.0357 45.8303 10.2757 45.3604 9.80813C43.735 8.18918 42.351 8.8759 41.6795 9.27258Z"
        fill="black"
      />
    </svg>
    <p className={styles.emptyText}>
      Looks like your admin hasn't added any tags yet, please talk to them to
      create new tags
    </p>
  </div>
);

interface TagTableProps {
  tags: TagData[];
  showAdminActions?: boolean;
}

export const TagTable: React.FC<TagTableProps> = ({
  tags,
  showAdminActions = false,
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
    setIsNewTagNameInvalid(false);
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
    setLocalTags([newTag, ...localTags]);
    setNewTagName("");
    setNewTagDescription("");
    setNewTagColor("#D1F4E0");
    setIsAddingTag(false);
    setIsNewTagNameInvalid(false);
  };

  const handleEditTag = (tag: TagData) => {
    setIsAddingTag(false);
    setShowColorPicker(false);
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
      setLocalTags(
        localTags.map((tag) =>
          tag.id === editingTagId
            ? {
                ...tag,
                tag: { ...tag.tag, name: editTagName, color: editTagColor },
                description: editTagDescription,
              }
            : tag
        )
      );
      setEditingTagId(null);
      setShowEditColorPicker(null);
      setIsEditTagNameInvalid(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setShowEditColorPicker(null);
    setIsEditTagNameInvalid(false);
  };

  const handleDeleteTag = (id: string) => {
    setLocalTags(localTags.filter((tag) => tag.id !== id));
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
        <EmptyState />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TAG</th>
                <th>DESCRIPTION</th>
                <th>ENTITIES TAGGED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* Add New Tag Row */}
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
                          onClick={() => setShowColorPicker(!showColorPicker)}
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
                            }}
                            selectedColor={newTagColor}
                            onClose={() => setShowColorPicker(false)}
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

              {/* Existing Tags */}
              {filteredTags.map((tag) => (
                <tr key={tag.id}>
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
                              onClick={() =>
                                setShowEditColorPicker(
                                  showEditColorPicker === tag.id ? null : tag.id
                                )
                              }
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
                                }}
                                selectedColor={editTagColor}
                                onClose={() => setShowEditColorPicker(null)}
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
                        {tag.description}
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
                                fill={showAdminActions ? "#0D4CBE" : "#D1D5DB"}
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
                                fill={showAdminActions ? "#E33946" : "#D1D5DB"}
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
