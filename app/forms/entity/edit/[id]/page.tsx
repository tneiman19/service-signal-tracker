import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const EntityForm = dynamic(() => import("@/app/forms/entity/EntityForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Props {
  params: { id: string };
}

const EditEntityPage = async ({ params }: Props) => {
  try {
    const entity = await axios.get(
      `${process.env.APP_DOMAIN}/api/entity/${params.id}`
    );
    if (!entity) return notFound();
    return <EntityForm entity={entity.data} />;
  } catch (error) {
    return notFound();
  }
};

export default EditEntityPage;
