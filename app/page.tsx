import { Entity } from "@prisma/client";
import EntityForm from "./entity/_components/EntityForm";

export default function Home() {
  const entity: Entity = {
    id: "f3c4fecd-2f85-4c58-8c8d-611651a2ac8e",
    entityName: "JCM Living",
    entityNote: "FKA Jersey Central Management",
    active: true,
    contactName: "Steve Neiman",
    contactEmail: "Steven@test",
    contactPhone: "2540974165",
    address: "1000 Airport Road",
    city: "Lakewood",
    state: "NJ",
    zip: "08854",
  };

  return (
    <>
      <h1>Service Signal</h1>
      <h2>Coming Soon...</h2>

      <EntityForm />
    </>
  );
}
