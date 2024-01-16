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

interface PropertyInfo {
  id: string;
  entityId: string;
  propertyName: string;
  propertyNote: string;
  active: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  buildingCount: number;
  unitCount: number;
  entityName: string;
}

const PropertyInfoPage = () => {
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo[] | null>(null);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  useEffect(() => {
    const fetchPropertyInfo = async () => {
      try {
        const response = await axios.get<PropertyInfo[]>("/api/info/property");
        setPropertyInfo(response.data);
      } catch (error) {
        setSubmitError("Error", `Issue fetching property info.`);
      }
    };

    fetchPropertyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!propertyInfo) {
    return (
      <>
        <p className="p-5 text-center">Loading Property Info...</p>
        {renderErrorAlert()}
      </>
    );
  }

  return (
    <section className="p-4 border border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
        Property Info
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {propertyInfo.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle className="text-center hover:cursor-pointer">
                <Link href={`/forms/property/edit/${property.id}`}>
                  {property.propertyName}
                </Link>
              </CardTitle>
              <CardDescription className="align-middle">
                {property.entityName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact">
                  <AccordionTrigger>Contact Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Name: <span>{property.contactName}</span>
                    </p>
                    <p className="font-thin">
                      Phone: <span>{property.contactPhone}</span>
                    </p>
                    <p className="font-thin">
                      Email:{" "}
                      <span className="hover:cursor-pointer">
                        <a
                          href={`mailto:${property.contactEmail}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {property.contactEmail}
                        </a>
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="address">
                  <AccordionTrigger>Address Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Address: <span>{property.address}</span>
                    </p>
                    <p className="font-thin">
                      City: <span>{property.city}</span>
                    </p>
                    <p className="font-thin">
                      State: <span>{property.state}</span>
                    </p>
                    <p className="font-thin">
                      Zip: <span>{property.zip}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="assets">
                  <AccordionTrigger>Assets</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Buildings: <span> {property.buildingCount}</span>
                    </p>
                    <p className="font-thin">
                      Units: <span>{property.unitCount}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="other">
                  <AccordionTrigger>Other</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-thin">
                      Notes: <span>{property.propertyNote}</span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <section className="flex justify-between pt-5">
                <Link href={`/forms/property/edit/${property.id}`}>
                  {" "}
                  <Button>Edit</Button>
                </Link>

                <div className="flex">
                  <Label className="pr-2 pt-1">Active</Label>
                  <ActiveToggle
                    active={property.active}
                    api={`/api/status_update/property/${property.id}`}
                    type="property"
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
