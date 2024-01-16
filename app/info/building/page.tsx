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
  CardDescription,
  Label,
} from "@/components/index";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

interface BuildingInfo {
  id: string;
  propertyId: string;
  buildingNumber: string;
  buildingNote: string;
  active: boolean;
  propertyName: string;
  entityName: string;
  entityId: string;
  unitCount: number;
}

const EntityInfoPage = () => {
  const [entityInfo, setEntityInfo] = useState<BuildingInfo[] | null>(null);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  useEffect(() => {
    const fetchEntityInfo = async () => {
      try {
        const response = await axios.get<BuildingInfo[]>("/api/info/building");
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
        Building Info
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {entityInfo.map((building) => (
          <Card key={building.id}>
            <CardHeader>
              <CardTitle className="text-center hover:cursor-pointer">
                <Link href={`/forms/building/edit/${building.id}`}>
                  {building.buildingNumber} - {building.propertyName}
                </Link>
              </CardTitle>
              <CardDescription className="align-middle">
                {building.entityName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="assets">
                  <AccordionTrigger>Assets</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Units: <span>{building.unitCount}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="other">
                  <AccordionTrigger>Other</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Notes: <span>{building.buildingNote}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <section className="flex justify-between pt-5">
                <Link href={`/forms/building/edit/${building.id}`}>
                  {" "}
                  <Button>Edit</Button>
                </Link>

                <div className="flex">
                  <Label className="pr-2 pt-1">Active</Label>
                  <ActiveToggle
                    active={building.active}
                    api={`/api/status_update/building/${building.id}`}
                    type="building"
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
