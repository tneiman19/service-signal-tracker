import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const PropertyForm = dynamic(
  () => import("@/app/forms/property/PropertyForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

interface Props {
  params: { id: string };
}

const EditPropertyPage = async ({ params }: Props) => {
  try {
    const property = await axios.get(
      `${process.env.APP_DOMAIN}/api/property/${params.id}`
    );
    if (!property) return notFound();
    return <PropertyForm property={property.data} />;
  } catch (error) {
    return notFound();
  }
};

export default EditPropertyPage;
