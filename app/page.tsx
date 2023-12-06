import { Entity } from "@prisma/client";
import EntityForm from "@/app/entity/_components/EntityForm";

export default function Home() {
  const entity: Entity = {
    id: "24b09c86-fce7-4148-bcc9-216a3536c515",
    entityName: "Testing Entity Form",
    entityNote: "Testing Entity Form",
    active: true,
    contactName: "Steve",
    contactEmail: "Steve@test.com",
    contactPhone: "1234567890",
    address: "123 Test Avenue",
    city: "Test",
    state: "NJ",
    zip: "01234",
  };

  return (
    <>
      <h1>Service Signal</h1>
      <h2>Coming Soon...</h2>

      <div className="flex">
        <EntityForm />
        <EntityForm entity={entity} />
      </div>
    </>
  );
}
