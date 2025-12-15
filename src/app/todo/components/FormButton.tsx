"use client";

import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";

const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="border rounded border-gray-400 px-4 py-2 mr-4 relative flex items-center justify-center shrink-0 whitespace-nowrap"
    >
      {/* Texto: define el ancho */}
      <span className={pending ? "invisible" : "visible"}>Add Todo</span>

      {/* Spinner: se superpone */}
      {pending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="animate-spin" />
        </span>
      )}
    </button>
  );
};
export default FormButton;
