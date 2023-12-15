import dynamic from "next/dynamic";

const PropertyForm = dynamic(() => import("@/app/forms/property/PropertyForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const NewProperty = () => {
  return <PropertyForm />;
};

export default NewProperty;
