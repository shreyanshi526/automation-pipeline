import { createNode } from "../components/BaseNode";

// creating mutiple node 
export const nodeTemplates = {
    textProcessor: (title, icon) => createNode({
        nodeType: "textProcessor",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base",
        inputClassName: "focus:ring-orange-500",
        className: "bg-orange-100 shadow-lg shadow-orange-300/50",
        style: { width: 280 },
        fields: [
            {
                key: "input",
                label: "Input Text",
                type: "textarea",
                placeholder: "Enter text here..."
            },
            {
                key: "operation",
                label: "Operation",
                type: "select",
                options: ["uppercase", "lowercase", "trim", "reverse"]
            }
        ],
        inputs: [{ id: "text-input" }],
        outputs: [{ id: "text-output" }]
    }),

    apiCall: (title, icon) => createNode({
        nodeType: "apiCall",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base",
        inputClassName: "focus:ring-blue-500",
        className: "bg-blue-100 shadow-lg shadow-blue-300/50",
        fields: [
            {
                key: "url",
                label: "API URL",
                type: "textarea",
                placeholder: "https://api.example.com/endpoint"
            },
            {
                key: "method",
                label: "HTTP Method",
                type: "select",
                options: ["GET", "POST", "PUT", "DELETE"]
            },
            {
                key: "headers",
                label: "Headers",
                type: "textarea",
                placeholder: "Content-Type: application/json"
            },
            {
                key: "body",
                label: "Request Body",
                type: "textarea",
                placeholder: "JSON payload"
            }
        ],
        inputs: [{ id: "trigger" }],
        outputs: [{ id: "success" }, { id: "error" }]
    }),

    condition: (title, icon) => createNode({
        nodeType: "condition",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-base",
        inputClassName: "focus:ring-teal-500",
        className: "bg-teal-100 shadow-lg shadow-teal-300/50",
        fields: [
            {
                key: "condition",
                label: "Condition",
                type: "textarea",
                placeholder: "{{input}} === 'value'"
            }
        ],
        inputs: [{ id: "input" }],
        outputs: [{ id: "true" }, { id: "false" }]
    }),

    // New template examples using different input types
    userForm: (title, icon) => createNode({
        nodeType: "userForm",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-base",
        inputClassName: "focus:ring-red-500",
        className: "bg-red-100 shadow-lg shadow-red-300/50",
        fields: [
            {
                key: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Enter full name"
            },
            {
                key: "email",
                label: "Email",
                type: "email",
                placeholder: "user@example.com"
            },
            {
                key: "age",
                label: "Age",
                type: "number",
                min: 0,
                max: 120,
                placeholder: "Enter age"
            },
            {
                key: "gender",
                label: "Gender",
                type: "select",
                options: ["Male", "Female", "Other", "Prefer not to say"]
            },
            {
                key: "newsletter",
                label: "Subscribe to Newsletter",
                type: "checkbox",
                checkboxLabel: "Yes, I want to receive updates"
            }
        ],
        inputs: [{ id: "form-input" }],
        outputs: [{ id: "form-output" }]
    }),

    dataProcessor: (title, icon) => createNode({
        nodeType: "dataProcessor",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold text-base",
        inputClassName: "focus:ring-pink-500",
        className: "bg-pink-100 shadow-lg shadow-pink-300/50",
        fields: [
            {
                key: "inputData",
                label: "Input Data",
                type: "textarea",
                placeholder: "Enter JSON data or text"
            },
            {
                key: "processType",
                label: "Processing Type",
                type: "radio",
                options: ["Transform", "Filter", "Validate", "Parse"]
            },
            {
                key: "outputFormat",
                label: "Output Format",
                type: "select",
                options: ["JSON", "CSV", "XML", "Plain Text"]
            },
            {
                key: "includeMetadata",
                label: "Include Metadata",
                type: "checkbox",
                checkboxLabel: "Add processing metadata to output"
            }
        ],
        inputs: [{ id: "data-input" }],
        outputs: [{ id: "processed-output" }, { id: "error-output" }]
    }),

    scheduler: (title, icon) => createNode({
        nodeType: "scheduler",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold text-base",
        inputClassName: "focus:ring-pink-500",
        className: "bg-purple-100 shadow-lg shadow-purple-300/50",
        fields: [
            {
                key: "startDate",
                label: "Start Date",
                type: "date"
            },
            {
                key: "endDate",
                label: "End Date",
                type: "date"
            },
            {
                key: "frequency",
                label: "Frequency",
                type: "select",
                options: ["Daily", "Weekly", "Monthly", "Yearly"]
            },
            {
                key: "description",
                label: "Description",
                type: "textarea",
                placeholder: "Describe the scheduled task"
            }
        ],
        inputs: [{ id: "schedule-trigger" }],
        outputs: [{ id: "scheduled-output" }]
    }),

    fileUpload: (title, icon) => createNode({
        nodeType: "fileUpload",
        title,
        icon,
        titleClassName: "bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-base",
        inputClassName: "focus:ring-teal-500",
        className: "bg-gray-100 shadow-lg shadow-gray-300/50",
        fields: [
            {
                key: "file",
                label: "Upload File",
                type: "file",
                accept: ".pdf,.doc,.docx,.txt",
                multiple: false
            },
            {
                key: "description",
                label: "File Description",
                type: "text",
                placeholder: "Describe the uploaded file"
            },
            {
                key: "processImmediately",
                label: "Process Immediately",
                type: "checkbox",
                checkboxLabel: "Start processing as soon as file is uploaded"
            }
        ],
        inputs: [{ id: "file-input" }],
        outputs: [{ id: "file-output" }, { id: "error-output" }]
    })
};