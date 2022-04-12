import React from "react";

function FormElement({ content, children }) {
  return (
    <div className="rounded border border-gray-400 p-3 ">
      <h1
        htmlFor="product name"
        className="block text-lg font-bold text-gray-600"
      >
        {content}
      </h1>
      {children}
    </div>
  );
}

export default FormElement;
