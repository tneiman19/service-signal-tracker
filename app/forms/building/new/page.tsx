import dynamic from "next/dynamic";

const BuildingForm = dynamic(() => import("@/app/forms/building/BuildingForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const NewBuilding = () => {
  return <BuildingForm />;
};

export default NewBuilding;