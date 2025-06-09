// TextNode.js
import { createNode } from "../components/BaseNode";
import { FaFont } from 'react-icons/fa6';

export const TextNode = createNode({
  nodeType: "text",
  title: "Text",
  icon: <FaFont />,
  titleClassName: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base",
  className: "bg-blue-100 shadow-lg shadow-blue-300/50",
  style: { width: 240},
  inputs: [{ id: "input-text" }],
  outputs: [{ id: "output" }],
  fields: [
    {
      key: "textarea",
      label: "Task Description",
      placeholder: "Enter your task description here...",
      inputClassName: "h-24",
      type: "textarea",
    },
    {
      key: "number",
      label: "Execute After (seconds)",
      type: "number",  
    }
  ],
});
