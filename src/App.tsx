import { useState } from "react";
import { TagFilter, TagSelector } from "./components";
import type { Tag } from "./components/TagFilter/TagFilter";

const sampleTags: Tag[] = [
  { id: "1", name: "Tag Name", color: "#ff9aa2" },
  { id: "2", name: "Tag Name", color: "#ffb347" },
  { id: "3", name: "Very long Tag Name", color: "#6b5b95" },
  { id: "4", name: "Short Tag Name", color: "#ffdab9" },
  { id: "5", name: "Tag Name", color: "#a8d5ba" },
  { id: "6", name: "Another Tag", color: "#87ceeb" },
  { id: "7", name: "Design", color: "#dda0dd" },
  { id: "8", name: "Development", color: "#98fb98" },
  { id: "9", name: "Marketing", color: "#f0e68c" },
  { id: "10", name: "Sales", color: "#ff6b6b" },
];

function App() {
  const [selectedFilterTag, setSelectedFilterTag] = useState<Tag | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Component Library Demo</h1>

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
          description="Description as to what this means"
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
