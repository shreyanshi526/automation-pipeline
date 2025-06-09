// ValidatorNode.js
import { createNode } from "../components/BaseNode";
import { FaCheckCircle } from "react-icons/fa";

export const ValidatorNode = createNode({
  nodeType: "validator",
  title: "Validator",
  icon: <FaCheckCircle />,
  titleClassName: "bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-base",
  inputClassName: "focus:ring-green-500",
  className: "bg-green-100 shadow-lg shadow-green-300/50",
  style: { width: 280},
  inputs: [{ id: "input-data" }],
  outputs: [{ id: "valid" }, { id: "invalid" }],
  fields: [
    {
      key: "rule",
      label: "Validation Rule",
      type: "select",
      options: ["isEmail", "isNumber", "isRequired"],
    },
    {
      key: "errorMsg",
      label: "Error Message",
      type: "text",
    },
    {
      key: "email",
      label: "Email Address",
      type: "Email",
      placeholder: "Enter email to validate",
    }
  ],
});