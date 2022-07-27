import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddPropertyForm from "components/AddProperty";
import Input from "components/Input";
import Footer from "components/Footer";
import { toast } from "react-toastify";
import { errorHandler } from "lib/utils";
import { useAddPropertyMutation } from "api/property";
import useGlobalStore from "store/global";
const Illustration =
  "https://img.freepik.com/free-photo/3d-illustration-residential-building-exterior_42251-556.jpg?w=900";

function AddPropertyPage() {
  // const property_admin = useGlobalStore((state) => state.data.property_admin);
  // const SIGNIN = useGlobalStore((state) => state.SIGNIN);
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [surface, setSurface] = useState("");
  const [price, setPrice] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [propertyImage, setPropertyImage] = useState("");
  const [agentImage, setAgentImage] = useState("");
  const { mutateAsync: addProperty, isLoading } = useAddPropertyMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("country", location);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("bedrooms", bed);
    formData.append("bathrooms", bath);
    formData.append("surface", surface);
    formData.append("year", year);
    formData.append("agentName", agentName);
    formData.append("agentPhone", agentPhone);
    formData.append("description", description);
    formData.append("propertyImage", propertyImage);
    formData.append("agentImage", agentImage);
    // const obj_data = {
    //   name,
    //   location,
    //   type,
    //   price,
    //   address,
    //   bed,
    //   bath,
    //   surface,
    //   year,
    //   agentName,
    //   agentPhone,
    //   description,
    //   propertyImage,
    //   agentImage,
    // };

    try {
      // console.log(formData);
      // console.log(obj_data);
      const { data } = await addProperty(formData);
      if (data) {
        handleReset();
        toast.success("your property added successfully");
      } else {
        toast.error("Unable to save your property, please try again later");
      }
    } catch (err) {
      toast.error(errorHandler(err));
    }
  };

  const handleReset = () => {
    formRef.current.reset();
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-0 min-h-screen overflow-auto mt-20 md:mt-0">
        <div className="w-full  p-6 mx-auto bg-white border-t border-gray-200  shadow shadow-gray-800/50 lg:max-w-2xl md:h-[500px] md:mx-0 md:ml-2">
          <AddPropertyForm
            handleSubmit={handleSubmit}
            name={name}
            setName={(e) => setName(e.target.value)}
            location={location}
            setLocation={(e) => setLocation(e.target.value)}
            type={type}
            setType={(e) => setType(e.target.value)}
            address={address}
            setAddress={(e) => setAddress(e.target.value)}
            bed={bed}
            setBed={(e) => setBed(e.target.value)}
            bath={bath}
            setBath={(e) => setBath(e.target.value)}
            surface={surface}
            setSurface={(e) => setSurface(e.target.value)}
            price={price}
            setPrice={(e) => setPrice(e.target.value)}
            agentName={agentName}
            setAgentName={(e) => setAgentName(e.target.value)}
            agentPhone={agentPhone}
            setAgentPhone={(e) => setAgentPhone(e.target.value)}
            description={description}
            setDescription={(e) => setDescription(e.target.value)}
            year={year}
            setYear={(e) => setYear(e.target.value)}
            propertyImage={propertyImage}
            setPropertyImage={(e) => setPropertyImage(e.target.files[0])}
            agentImage={agentImage}
            setAgentImage={(e) => setAgentImage(e.target.files[0])}
            loading={isLoading}
            formRef={formRef}
          />
        </div>
        <div className="hidden lg:block lg:max-w-3xl w-full  shadow-md">
          <img src={Illustration} alt="" className="h-[500px] w-full " />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddPropertyPage;
