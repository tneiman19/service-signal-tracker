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

interface UnitInfo {
  id: string;
  unitNumber: string;
  unitNote: string;
  active: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyName: string;
  entityName: string;
  buildingNumber: string;
}

const PropertyInfoPage = () => {
  const [propertyInfo, setPropertyInfo] = useState<UnitInfo[] | null>(null);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  useEffect(() => {
    const fetchPropertyInfo = async () => {
      try {
        const response = await axios.get<UnitInfo[]>("/api/info/unit");
        setPropertyInfo(response.data);
      } catch (error) {
        setSubmitError("Error", `Issue fetching unit info.`);
      }
    };

    fetchPropertyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!propertyInfo) {
    return (
      <>
        <p className="p-5 text-center">Loading Unit Info...</p>
        {renderErrorAlert()}
      </>
    );
  }

  return (
    <section className="p-4 border border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
        Unit Info
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {propertyInfo.map((unit) => (
          <Card key={unit.id}>
            <CardHeader>
              <CardTitle className="text-center hover:cursor-pointer">
                <Link href={`/forms/unit/edit/${unit.id}`}>
                  {unit.unitNumber}
                </Link>
              </CardTitle>
              <CardDescription className="align-middle">
                Property: {unit.propertyName}
              </CardDescription>
              <CardDescription className="align-middle">
                Entity: {unit.entityName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact">
                  <AccordionTrigger>Contact Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Name: <span>{unit.contactName}</span>
                    </p>
                    <p className="font-thin">
                      Phone: <span>{unit.contactPhone}</span>
                    </p>
                    <p className="font-thin">
                      Email:{" "}
                      <span className="hover:cursor-pointer">
                        <a
                          href={`mailto:${unit.contactEmail}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {unit.contactEmail}
                        </a>
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="address">
                  <AccordionTrigger>Address Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Address: <span>{unit.address}</span>
                    </p>
                    <p className="font-thin">
                      City: <span>{unit.city}</span>
                    </p>
                    <p className="font-thin">
                      State: <span>{unit.state}</span>
                    </p>
                    <p className="font-thin">
                      Zip: <span>{unit.zip}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <section className="flex justify-between pt-5">
                <Link href={`/forms/property/edit/${unit.id}`}>
                  {" "}
                  <Button>Edit</Button>
                </Link>

                <div className="flex">
                  <Label className="pr-2 pt-1">Active</Label>
                  <ActiveToggle
                    active={unit.active}
                    api={`/api/status_update/unit/${unit.id}`}
                    type="unit"
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

export default PropertyInfoPage;
