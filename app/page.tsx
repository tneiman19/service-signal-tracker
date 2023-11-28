import { Entity } from "@prisma/client";
import EntityForm from "./entity/_components/EntityForm";

export default function Home() {
  const entity: Entity = {
    id: "f3c4fecd-2f85-4c58-8c8d-611651a2ac8e",
    entityName: "Testing Form",
    entityNote: "Testing desc",
    active: true,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  return (
    <>
      <h1>Service Signal</h1>
      <h2>Coming Soon...</h2>

      <EntityForm />
    </>
  );
}
