"use client";
import ActiveToggle from "@/components/ActiveToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
} from "@/components/index";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

interface EntityInfo {
  id: string;
  entityName: string;
  entityNote: string;
  active: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyCount: number;
  buildingCount: number;
  unitCount: number;
}

const EntityInfoPage = () => {
  const [entityInfo, setEntityInfo] = useState<EntityInfo[] | null>(null);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  useEffect(() => {
    const fetchEntityInfo = async () => {
      try {
        const response = await axios.get<EntityInfo[]>("/api/info/entity");
        setEntityInfo(response.data);
      } catch (error) {
        setSubmitError("Error", `Issue fetching entity info.`);
      }
    };

    fetchEntityInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!entityInfo) {
    return (
      <>
        <p className="p-5 text-center">Loading Entity Info...</p>
        {renderErrorAlert()}
      </>
    );
  }

  return (
    <section className="p-4 border border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
        Entity Info
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {entityInfo.map((entity) => (
          <Card key={entity.id}>
            <CardHeader>
              <CardTitle className="text-center hover:cursor-pointer">
                <Link href={`/forms/entity/edit/${entity.id}`}>
                  {entity.entityName}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact">
                  <AccordionTrigger>Contact Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Name: <span>{entity.contactName}</span>
                    </p>
                    <p className="font-thin">
                      Phone: <span>{entity.contactPhone}</span>
                    </p>
                    <p className="font-thin">
                      Email:{" "}
                      <span className="hover:cursor-pointer">
                        <a
                          href={`mailto:${entity.contactEmail}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {entity.contactEmail}
                        </a>
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="address">
                  <AccordionTrigger>Address Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Address: <span>{entity.address}</span>
                    </p>
                    <p className="font-thin">
                      City: <span>{entity.city}</span>
                    </p>
                    <p className="font-thin">
                      State: <span>{entity.state}</span>
                    </p>
                    <p className="font-thin">
                      Zip: <span>{entity.zip}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="assets">
                  <AccordionTrigger>Assets</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Properties: <span>{entity.propertyCount}</span>
                    </p>
                    <p className="font-thin">
                      Buildings: <span> {entity.buildingCount}</span>
                    </p>
                    <p className="font-thin">
                      Units: <span>{entity.unitCount}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="other">
                  <AccordionTrigger>Other</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Notes: <span>{entity.entityNote}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <section className="flex justify-between pt-5">
                <Link href={`/forms/entity/edit/${entity.id}`}>
                  {" "}
                  <Button>Edit</Button>
                </Link>

                <div className="flex">
                  <Label className="pr-2 pt-1">Active</Label>
                  <ActiveToggle
                    active={entity.active}
                    api={`/api/status_update/entity/${entity.id}`}
                    type="entity"
                  />
                </div>
              </section>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EntityInfoPage;
