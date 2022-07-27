import { useState, useEffect } from "react";
function AddProperty(props) {
  const [enable, setEnabled] = useState(false);
  const {
    handleSubmit,
    name,
    setName,
    location,
    setLocation,
    type,
    setType,
    address,
    setAddress,
    bed,
    setBed,
    bath,
    setBath,
    surface,
    setSurface,
    price,
    setPrice,
    agentName,
    setAgentName,
    agentPhone,
    setAgentPhone,
    description,
    setDescription,
    year,
    setYear,
    propertyImage,
    setPropertyImage,
    agentImage,
    setAgentImage,
    loading,
    formRef,
  } = props;

  useEffect(() => {
    if (
      !!name &&
      !!location &&
      !!address &&
      !!bed &&
      !!bath &&
      !!surface &&
      !!year &&
      !!price &&
      !!agentImage &&
      !!description &&
      !!propertyImage &&
      !!agentName &&
      !!agentPhone &&
      !!description
    ) {
      setEnabled(true);
    }
  }, [
    name,
    location,
    address,
    bed,
    bath,
    surface,
    year,
    price,
    agentImage,
    agentName,
    agentPhone,
    description,
    propertyImage,
  ]);

  return (
    <>
      <form
        className="flex flex-col space-y-4 mb-20 md:mb-0"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Name*</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={setName}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">
              location(country)*
            </label>
            <select
              type="text"
              name="location"
              value={location}
              onChange={setLocation}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full md:w-[176px] px-2 h-10 md:h-8 text-sm outline-none"
            >
              <option>select...</option>
              <option value="Nigeria">Nigeria</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">category*</label>
            <select
              type="text"
              name="type"
              value={type}
              onChange={setType}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full md:w-[176px] px-2 h-10 md:h-8 text-sm outline-none"
            >
              <option>select...</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Bed Room*</label>
            <input
              type="text"
              name="bed"
              value={bed}
              onChange={setBed}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Bath Room*</label>
            <input
              type="text"
              name="bath"
              value={bath}
              onChange={setBath}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Surface*</label>
            <input
              type="text"
              name="surface"
              value={surface}
              onChange={setSurface}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 space-x-0 justify-between">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Property Image*</label>
            <input
              type="file"
              name="propertyImage"
              onChange={setPropertyImage}
              className="block border border-violet-300 py-[1px] rounded w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 h-10 md:h-8"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Price*</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={setPrice}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 text-sm outline-none h-10 md:h-8"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Year*</label>
            <input
              type="text"
              name="year"
              value={year}
              onChange={setYear}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 space-x-0 justify-between">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600">Agent Image*</label>
            <input
              type="file"
              name="agentImage"
              onChange={setAgentImage}
              className="block border border-violet-300 py-[1px] rounded w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 h-10 md:h-8"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600 ml-1">Agent Name*</label>
            <input
              type="text"
              name="AgentName"
              value={agentName}
              onChange={setAgentName}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600 ml-1">Agent Phone*</label>
            <input
              type="text"
              name="agentPhone"
              value={agentPhone}
              onChange={setAgentPhone}
              className="border border-violet-300  focus:shadow-sm focus:shadow-violet-800/50 rounded w-full px-2 h-10 md:h-8 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 space-x-0 justify-between">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600 ">Description*</label>
            <textarea
              className="border border-violet-300 focus:border-violet-700 rounded w-full md:w-[300px] h-12 px-2 text-sm text-gray-700 outline-none resize-none"
              type="text"
              placeholder="Hello"
              value={description}
              onChange={setDescription}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-violet-600 ml-1">Address*</label>
            <textarea
              className="border border-violet-300 focus:border-violet-700 rounded w-full md:w-[300px] h-12 px-2 text-sm text-gray-700 outline-none resize-none"
              type="text"
              placeholder="Hello"
              value={address}
              onChange={setAddress}
            />
          </div>
        </div>
        <div>
          <button
            className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition disabled:bg-violet-500 disabled:cursor-not-allowed"
            type="submit"
            disabled={!enable || loading}
          >
            {loading ? "Add..." : "Add Property"}
          </button>
        </div>
      </form>
    </>
  );
}
export default AddProperty;
