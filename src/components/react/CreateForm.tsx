import { useState } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { kebabCase } from "change-case";
import { toISODate } from "../../utils";
import "@mdxeditor/editor/style.css";

function handleSubmit(formData: FormData) {
  const data = Object.fromEntries(formData);
  const filename = `${data.slug || kebabCase(String(data.title))}.md`;
  const value = `---
title: ${data.title}
description: ${data.description}
tags: ${data.tags}
pubDate: ${toISODate(new Date())}
lang: en
---

${data.body}
`;

  const searchParams = new URLSearchParams({ filename, value });
  const url = `https://github.com/zettca/recipes/new/master/src/content/recipes?${searchParams}`;

  window.open(url, "_blank");
}

export function CreateForm() {
  return (
    <form className="grid gap-4" action={handleSubmit}>
      <input type="hidden" name="slug" />
      <Input
        required
        autoFocus
        name="title"
        label="Title"
        placeholder="Mushroom Risotto"
      />
      <Input
        name="description"
        label="Description"
        placeholder="Risotto with mushrooms and bacon"
      />
      <Input name="tags" label="Tags" placeholder="italian, rice, yummy" />
      <ContentEditor />
      <button type="submit" className="w-180px border rounded">
        Submit
      </button>
    </form>
  );
}

function Input({
  label,
  ...others
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <label className="grid">
      <span className="font-bold">{label}</span>
      <input type="text" className="border px-2 py-1 rounded" {...others} />
    </label>
  );
}

function ContentEditor() {
  const [value, setValue] = useState(defaultMd);

  return (
    <div>
      <input type="hidden" name="body" value={value} />
      <span className="font-bold">Body</span>
      <MDXEditor
        markdown={value}
        onChange={setValue}
        className="w-full border"
        contentEditableClassName="min-h-360px [&_ul]:list-disc ![&_ul]:px-5 [&_ol]:list-decimal ![&_ol]:px-5"
        toMarkdownOptions={{
          bullet: "-",
        }}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          toolbarPlugin({
            toolbarClassName: "!rounded-0 flex-wrap ![&>*]:m-0",
            toolbarContents: () => (
              <>
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <div className="flex-1" />
                <div className="[&_button]:w-fit [&_button]:m-0">
                  <BlockTypeSelect />
                </div>
                <UndoRedo />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

const defaultMd = `
## Ingredients

- item 1
- item 2

## Preparation

1. step 1
1. step 2
`;
