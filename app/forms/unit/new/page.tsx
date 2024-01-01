import dynamic from "next/dynamic";

const UnitForm = dynamic(
  () => import("@/app/forms/unit/UnitForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const NewUnit = () => {
  return <UnitForm />;
};

export default NewUnit;
