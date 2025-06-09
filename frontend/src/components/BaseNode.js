import { useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { renderField } from "./FormComponent";

const styles = {
  wrapper: {
    padding: 10,
    borderRadius: 8,
    border: "2px solid #ccc",
    background: "#fff",
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    margin: '0px 2px 4px 2px',
    borderRadius: '8px',
  },
  handle: {
    width: '10px',
    height: '10px',
    backgroundColor: '#00000',
    border: '1px solid #ffffff',
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
    position: 'absolute',
  },
};

// Private NodeComp component
const NodeComp = ({ data, className, style }) => {
  const { getNodes, addEdges, setNodes } = useReactFlow();
  const [inputValues, setInputValues] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const handleFieldChange = (e, key) => {
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [key]: value }));

    const cursor = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursor);

    if (textBeforeCursor.endsWith("{{")) {
      const currentNodes = getNodes().filter((node) => node.id !== data.id);
      setFilteredNodes(currentNodes);
      setShowSuggestions(true);
      setActiveField({ key, cursor });
    } else {
      setShowSuggestions(false);
      setActiveField(null);
    }

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === data.id
          ? {
            ...node,
            data: {
              ...node.data,
              [key]: value,
            },
          }
          : node
      )
    );
  };


  const handleSuggestionClick = (nodeId) => {
    const { key, cursor } = activeField;
    const value = inputValues[key] || "";

    const before = value.slice(0, cursor);
    const after = value.slice(cursor);
    const newText = `${before}${nodeId}}}${after}`;

    setInputValues((prev) => ({ ...prev, [key]: newText }));
    setShowSuggestions(false);

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === data.id
          ? {
            ...node,
            data: {
              ...node.data,
              [key]: newText,
            },
          }
          : node
      )
    );

    addEdges({
      id: `${nodeId}-${data.id}-${key}`,
      source: nodeId,
      target: data.id,
      sourceHandle: null,
      targetHandle: null,
    });
  };

  return (
    <div
      className={`nowheel shadow ${className}`}
      style={{ ...styles.wrapper, ...style }}
    >
      {/* Title */}
      <div className={`mb-2 flex items-center gap-2 ${data.titleClassName}`} style={styles.title}>
        {data.icon}
        {data.title}
      </div>

      {/* Render Fields using renderField from FormInputs */}
      {data.fields.map((field) =>
        renderField({
          field,
          inputValues,
          handleFieldChange,
          filteredNodes,
          showSuggestions,
          activeField,
          handleSuggestionClick,
          inputClassName: data.inputClassName || "",
        })
      )}

      {/* Input Handles */}
      {(data.inputs || []).map((input, i) => (
        <Handle
          key={input.id || i}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ ...styles.handle, top: 30 + i * 20, left: -6 }}
        />
      ))}

      {/* Output Handles */}
      {(data.outputs || []).map((output, i) => (
        <Handle
          key={output.id || i}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ ...styles.handle, top: 30 + i * 20, right: -6 }}
        />
      ))}
    </div>
  );
};

// Public Factory Method
export const createNode = (nodeConfig) => {
  const {
    nodeType,
    title,
    icon,
    fields = [],
    inputs = [],
    outputs = [],
    className = "",
    titleClassName = "",
    inputClassName = "",
    style = {},
    ...additionalProps
  } = nodeConfig;

  // Return a React component that uses NodeComp internally
  return (props) => (
    <NodeComp
      {...props}
      data={{
        nodeType,
        title,
        icon,
        fields,
        inputs,
        outputs,
        titleClassName,
        inputClassName,
        ...additionalProps,
        ...props.data, // Allow overriding via props
      }}
      className={className}
      style={style}
    />
  );
};

