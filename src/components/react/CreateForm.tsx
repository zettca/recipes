import { kebabCase } from "change-case";

const baseUrl =
  "https://github.com/zettca/recipes/new/master/src/content/recipes";

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const filename = `${kebabCase(String(data.title))}.md`;
  const value = `---
title: ${data.title}
description: ${data.description}
tags: ${data.tags}
pubDate: ${new Date().toISOString().slice(0, 10)}
lang: en
---
`;

  const searchParams = new URLSearchParams({ filename, value });
  const url = `${baseUrl}?${searchParams}`;

  window.open(url, "_blank");
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...others }: InputProps) {
  return (
    <label className="flex flex-col">
      {label}
      <input type="text" {...others} />
    </label>
  );
}

export function CreateForm() {
  return (
    <form className="flex flex-col gap-2 max-w-360px" onSubmit={handleSubmit}>
      <Input required name="title" label="Title" placeholder="Title" />
      <Input name="description" label="Description" placeholder="Description" />
      <Input name="tags" label="Tags" />
      <button type="submit" className="w-30">
        Submit
      </button>
    </form>
  );
}
