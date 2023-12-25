import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const BuildingForm = dynamic(() => import("@/app/forms/building/BuildingForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Props {
  params: { id: string };
}

const EditBuildingPage = async ({ params }: Props) => {
  try {
    const building = await axios.get(
      `${process.env.APP_DOMAIN}/api/building/${params.id}`
    );
    if (!building) return notFound();
    return <BuildingForm building={building.data} />;
  } catch (error) {
    return notFound();
  }
};

export default EditBuildingPage;
