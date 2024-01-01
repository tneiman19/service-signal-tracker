import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const UnitForm = dynamic(
  () => import("@/app/forms/unit/UnitForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

interface Props {
  params: { id: string };
}

const EditUnitPage = async ({ params }: Props) => {
  try {
    const unit = await axios.get(
      `${process.env.APP_DOMAIN}/api/unit/${params.id}`
    );
    if (!unit) return notFound();
    return <UnitForm unit={unit.data} />;
  } catch (error) {
    return notFound();
  }
};

export default EditUnitPage;
