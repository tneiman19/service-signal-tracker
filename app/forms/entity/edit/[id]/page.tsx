import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

const EntityForm = dynamic(() => import("@/app/forms/entity/EntityForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Props {
  params: { id: string };
}

const EditEntityPage = async ({ params }: Props) => {
  const entity = await prisma.entity.findUnique({
    where: { id: params.id },
  });
  if (!entity) return notFound();
  return <EntityForm entity={entity} />;
};

export default EditEntityPage;
