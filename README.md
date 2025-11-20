## Installation

```bash
pnpm i tags-ui-test
```

## Usage

```tsx
import { TagFilter, TagSelector } from "tags-ui-test";
```

### TagFilter Component

```tsx
import { TagFilter } from "tags-ui-test";

function App() {
  const tags = [
    { id: "1", name: "React", color: "#61dafb" },
    { id: "2", name: "TypeScript", color: "#3178c6" },
    { id: "3", name: "JavaScript", color: "#f7df1e" },
  ];

  return (
    <TagFilter
      tags={tags}
      onChange={(tag) => console.log("Selected:", tag)}
      onManageTags={() => console.log("Manage tags clicked")}
      buttonLabel="Tags"
    />
  );
}
```

### TagSelector Component

```tsx
import { TagSelector } from "tags-ui-test";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    { id: "1", name: "React", color: "#61dafb" },
    { id: "2", name: "TypeScript", color: "#3178c6" },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Tag Selector</button>

      <TagSelector
        availableTags={availableTags}
        selectedTags={selectedTags}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onTagsChange={(tags) => setSelectedTags(tags)}
        onManage={() => console.log("Manage clicked")}
        title="Add tags"
        description="Select tags to categorize items"
      />
    </>
  );
}
```
