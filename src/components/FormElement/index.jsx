import React from "react";

function FormElement({ content, children }) {
  return (
    <div className="rounded-xl border border-gray-300 p-3">
      <h1
        htmlFor="product name"
        className="block text-lg text-gray-500 pb-3 font-normal uppercase"
      >
        {content}
      </h1>
      {children}
    </div>
  );
}

export default FormElement;
