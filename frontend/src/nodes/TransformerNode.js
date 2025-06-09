import { createNode } from "../components/BaseNode";
import { FaMagic } from "react-icons/fa";

export const TransformerNode = createNode({
  nodeType: "transformer",
  title: "Transformer",
  icon: <FaMagic />,
  titleClassName: "bg-gradient-to-r from-purple-500 to-indigo-600  text-white font-semibold text-lg",
  inputClassName: "focus:ring-purple-500",
  className: "bg-purple-100 shadow-lg shadow-purple-300/50",
  style: { width: 300},
  inputs: [{ id: "input1" }, { id: "input2" }],
  outputs: [{ id: "result" }],
  fields: [
    {
      key: "mode",
      label: "Mode",
      type: "select",
      options: ["Uppercase", "Lowercase", "Capitalize"],
    },
    {
      key: "label",
      label: "Output Label",
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a description for this transformer node...",
      inputClassName: "h-24",
    }
  ],
});

