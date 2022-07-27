import { useContext } from "react";
import { FormContext } from "components/Form";

function FormInput(props) {
  const { label, type = "text", name } = props;

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-800">{label}</label>
      <input
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type={type}
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      />
    </div>
  );
}

export default FormInput;
