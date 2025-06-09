// FormInputs.js - Reusable input components

import React, { useRef, useEffect } from "react";

// Base Input Wrapper Component
const InputWrapper = ({ field, children, showSuggestions, activeField, filteredNodes, handleSuggestionClick }) => (
  <div className="mb-3 relative">
    <label className="block font-medium text-xs text-gray-600 mb-1">
      {field.label}
    </label>
    {children}
    {/* Suggestions dropdown */}
    {showSuggestions && activeField?.key === field.key && (
      <div className="absolute z-50 mt-1 bg-white border border-slate-200 rounded shadow max-h-32 overflow-auto w-full">
        {filteredNodes.map((node, idx) => (
          <div
            key={`${node.id}-${node.data?.nodeType || ''}-${idx}`}
            onClick={() => handleSuggestionClick(node.id)}
            className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
          >
            {node.id} - {node.data?.nodeType}
          </div>
        ))}
      </div>
    )}
  </div>
);

// Select Input Component
export const SelectInput = ({ field, value, onChange, inputClassName = "" }) => (
  <select
    value={value || ""}
    onChange={onChange}
    className={`w-full text-sm px-2 py-1 border rounded ${inputClassName}`}
  >
    <option value="">-- Select --</option>
    {field.options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

// Auto-resize Textarea Component
export const AutoResizeTextarea = ({
  field,
  value,
  onChange,
  inputClassName = "",
}) => {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  // Highlight {{variable}} with a span
  const getHighlightedText = (text) => {
    if (!text) return "";
    // Escape HTML special chars
    const escapeHtml = (str) =>
      str.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
    // Replace {{variable}} with highlighted span
    return escapeHtml(text).replace(
      /(\{\{.*?\}\})/g,
      '<span style="background: #fff9c4;">$1</span>'
    );
  };

  // Sync scroll between textarea and highlight
  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      const maxHeight = 160;
      if (newHeight <= maxHeight) {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      }
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <div
        ref={highlightRef}
        className={`absolute inset-0 pointer-events-none whitespace-pre-wrap break-words rounded p-2 ${inputClassName}`}
        style={{
          color: "transparent",
          background: "transparent",
          zIndex: 1,
          minHeight: 32,
          maxHeight: 160,
          overflowY: "auto",
        }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: getHighlightedText(value) + "\u200b" }}
      />
      <textarea
        ref={textareaRef}
        value={value || ""}
        onChange={onChange}
        className={`w-full p-2 border rounded resize-none overflow-y-auto min-h-[32px] max-h-40 bg-transparent relative z-10 ${inputClassName}`}
        rows={1}
        placeholder={field.placeholder || ""}
        style={{
          background: "transparent",
          position: "relative",
          zIndex: 2,
        }}
        onScroll={syncScroll}
      />
    </div>
  );
};

// Text Input Component
export const TextInput = ({ field, value, onChange, inputClassName = "" }) => (
  <input
    type="text"
    value={value || ""}
    onChange={onChange}
    placeholder={field.placeholder || ""}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// Number Input Component
export const NumberInput = ({ field, value, onChange, inputClassName = "" }) => (
  <input
    type="number"
    value={value || ""}
    onChange={onChange}
    placeholder={field.placeholder || ""}
    min={field.min}
    max={field.max}
    step={field.step}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// Email Input Component
export const EmailInput = ({ field, value, onChange, inputClassName = "" }) => (
  <input
    type="email"
    value={value || ""}
    onChange={onChange}
    placeholder={field.placeholder || ""}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// Password Input Component
export const PasswordInput = ({ field, value, onChange, inputClassName = "" }) => (
  <input
    type="password"
    value={value || ""}
    onChange={onChange}
    placeholder={field.placeholder || ""}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// Checkbox Input Component
export const CheckboxInput = ({ field, value, onChange, inputClassName = "" }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={value || false}
      onChange={onChange}
      className={`mr-2 ${inputClassName}`}
    />
    <span className="text-sm">{field.checkboxLabel || field.label}</span>
  </div>
);

// Radio Group Component
export const RadioGroup = ({ field, value, onChange, inputClassName = "" }) => (
  <div className="space-y-2">
    {field.options.map((option) => (
      <div key={option} className="flex items-center">
        <input
          type="radio"
          name={field.key}
          value={option}
          checked={value === option}
          onChange={onChange}
          className={`mr-2 ${inputClassName}`}
        />
        <span className="text-sm">{option}</span>
      </div>
    ))}
  </div>
);

// Date Input Component
export const DateInput = ({ field, value, onChange, inputClassName = "" }) => (
  <input
    type="date"
    value={value || ""}
    onChange={onChange}
    min={field.min}
    max={field.max}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// File Input Component
export const FileInput = ({ field, onChange, inputClassName = "" }) => (
  <input
    type="file"
    onChange={onChange}
    accept={field.accept}
    multiple={field.multiple}
    className={`w-full p-2 border rounded ${inputClassName}`}
  />
);

// Main Field Renderer Component
export const renderField = ({
  field,
  inputValues,
  handleFieldChange,
  filteredNodes,
  showSuggestions,
  activeField,
  handleSuggestionClick,
  inputClassName = "",
}) => {
  const commonProps = {
    field,
    value: inputValues[field.key],
    onChange: (e) => handleFieldChange(e, field.key),
    inputClassName,
  };

  const getInputComponent = () => {
    switch (field.type) {
      case "select":
        return <SelectInput {...commonProps} />;
      case "textarea":
        return <AutoResizeTextarea {...commonProps} />;
      case "text":
        return <TextInput {...commonProps} />;
      case "number":
        return <NumberInput {...commonProps} />;
      case "email":
        return <EmailInput {...commonProps} />;
      case "password":
        return <PasswordInput {...commonProps} />;
      case "checkbox":
        return <CheckboxInput {...commonProps} />;
      case "radio":
        return <RadioGroup {...commonProps} />;
      case "date":
        return <DateInput {...commonProps} />;
      case "file":
        return <FileInput {...commonProps} onChange={(e) => handleFieldChange(e, field.key)} />;
      default:
        return <AutoResizeTextarea {...commonProps} />;
    }
  };

  return (
    <InputWrapper
      key={field.key}
      field={field}
      showSuggestions={showSuggestions}
      activeField={activeField}
      filteredNodes={filteredNodes}
      handleSuggestionClick={handleSuggestionClick}
    >
      {getInputComponent()}
    </InputWrapper>
  );
};