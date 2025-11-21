import { useState } from "react";
import { TagFilter, TagSelector, TagTable } from "./components";
import type { Tag } from "./components/TagFilter/TagFilter";

interface TagData {
  id: string;
  tag: Tag;
  entitiesTagged: number;
  description: string;
}

const sampleTableTags: TagData[] = [
  {
    id: "101",
    description: "This is a tag description",
    entitiesTagged: 4,
    tag: { id: "1", name: "Tag A", color: "#ff0701" },
  },
  {
    id: "102",
    description: "Used for categorizing urgent tasks",
    entitiesTagged: 12,
    tag: { id: "2", name: "Tag B", color: "#fe8100" },
  },
  {
    id: "103",
    description: "Applies to long-term tracked entities",
    entitiesTagged: 7,
    tag: { id: "3", name: "Long Tag C", color: "#fcbc00" },
  },
  {
    id: "104",
    description: "Indicates active status for items",
    entitiesTagged: 19,
    tag: { id: "4", name: "Tag D", color: "#03c400" },
  },
  {
    id: "105",
    description: "Related to archived entries",
    entitiesTagged: 3,
    tag: { id: "5", name: "Tag E", color: "#006ffb" },
  },
  {
    id: "106",
    description: "Special category for flagged items",
    entitiesTagged: 8,
    tag: { id: "6", name: "Tag F", color: "#a941cd" },
  },
  {
    id: "107",
    description: "General category with mixed use cases",
    entitiesTagged: 14,
    tag: { id: "7", name: "Tag G", color: "#828186" },
  },
  {
    id: "108",
    description: "Used for marking clinic-related data",
    entitiesTagged: 6,
    tag: { id: "8", name: "Tag This A Clinic", color: "#c5eada" },
  },
];

const sampleTags: Tag[] = [
  { id: "1", name: "Tag A", color: "#ff0701" },
  { id: "2", name: "Tag B", color: "#fe8100" },
  { id: "3", name: "Long Tag C", color: "#fcbc00" },
  { id: "4", name: "Tag D", color: "#03c400" },
  { id: "5", name: "Tag E", color: "#006ffb" },
  { id: "6", name: "Tag F", color: "#a941cd" },
  { id: "7", name: "Tag G", color: "#828186" },
  { id: "8", name: "Tag This A Clinic", color: "#c5eada" },
];

function App() {
  const [selectedFilterTag, setSelectedFilterTag] = useState<Tag | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [tableTags, setTableTags] = useState<TagData[]>(sampleTableTags);

  const mappedTags = tableTags.map((tag) => ({
    id: tag.id,
    name: tag.tag.name,
    color: tag.tag.color,
    description: tag.description,
    entitiesTagged: tag.entitiesTagged,
  }));

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Component Library Demo</h1>

      <TagTable
        tags={tableTags}
        showAdminActions
        onTagsChange={(newTags) => {
          setTableTags(newTags);
        }}
      />

      {mappedTags.map((t) => (
        <div
          key={t.id}
          style={{ borderLeft: `4px solid ${t.color}`, padding: "8px" }}
        >
          <strong style={{ color: t.color }}>{t.name}</strong>
          <p>{t.description}</p>
          <span>Tagged entities: {t.entitiesTagged}</span>
        </div>
      ))}

      <div style={{ marginBottom: "40px" }}>
        <h2>TagFilter Component</h2>
        <p>Selected: {selectedFilterTag?.name || "None (All)"}</p>
        <TagFilter
          tags={sampleTags}
          onChange={(tag) => {
            setSelectedFilterTag(tag);
            console.log("Selected tag:", tag);
          }}
          onManageTags={() => {
            console.log("Manage tags clicked");
            alert("Manage tags clicked!");
          }}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>TagFilter with Custom Trigger</h2>
        <div style={{ width: "800px" }}></div>
        <TagFilter
          tags={sampleTags}
          onChange={(tag) => {
            setSelectedFilterTag(tag);
            console.log("Selected tag (custom):", tag);
          }}
          matchTriggerWidth
          onManageTags={() => {
            console.log("Manage tags clicked");
            alert("Manage tags clicked!");
          }}
        >
          <button
            style={{
              display: "inline-flex",
              height: "28px",
              padding: "2px 18px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              flexShrink: "0",
              borderRadius: "100px",
              background: "#0D4CBE",
            }}
          >
            {selectedFilterTag ? (
              <span
                style={{
                  color: "#ffff",
                  background: selectedFilterTag.color
                    ? selectedFilterTag.color
                    : "#0D4CBE",
                }}
              >
                {selectedFilterTag.name}
              </span>
            ) : (
              <div
                style={{
                  color: "#ffff",
                  background: "#0D4CBE",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M5.14286 6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714Z"
                    fill="#E8EAED"
                  />
                </svg>
                <span
                  style={{
                    color: "#ffff",
                  }}
                >
                  Add Tag
                </span>
              </div>
            )}
          </button>
        </TagFilter>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>TagSelector Component</h2>
        <p>Selected: {selectedTags.map((t) => t.name).join(", ") || "None"}</p>
        <button
          onClick={() => setIsSelectorOpen(true)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Open Tag Selector
        </button>

        <TagSelector
          availableTags={sampleTags}
          selectedTags={selectedTags}
          title="Add tags to 5 invoices"
          isOpen={isSelectorOpen}
          onClose={() => setIsSelectorOpen(false)}
          onTagsChange={(tags) => {
            setSelectedTags(tags);
            console.log("Selected tags:", tags);
          }}
          onManage={() => {
            console.log("Manage clicked");
            alert("Manage clicked!");
          }}
        />
      </div>
    </div>
  );
}

export default App;
