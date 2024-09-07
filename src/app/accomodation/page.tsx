import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { MapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type AccomodationData = {
  name: string;
  distance: number;
  link: string;
};

const accomodationData: AccomodationData[] = [
  {
    name: "Darling residency",
    distance: 3.9,
    link: "https://maps.app.goo.gl/CLfnfo8n3yrqVhAc6",
  },
  {
    name: "Baby residency",
    distance: 4,
    link: "https://maps.app.goo.gl/wgpUS7e2NHrqCGdp7",
  },
  {
    name: "Grand Ganpat",
    distance: 4,
    link: "https://maps.app.goo.gl/pbKL66v5Z1HHmEqj6",
  },
  {
    name: "Khanna fiesta",
    distance: 4.2,
    link: "https://maps.app.goo.gl/bUZTdFqK3fSccdNQ8",
  },
  {
    name: "Aavana inn",
    distance: 6.4,
    link: "https://maps.app.goo.gl/iRJcXs4CZqwuK46D9",
  },
  {
    name: "Benz park",
    distance: 6.7,
    link: "https://maps.app.goo.gl/qaHLfAwozkSywvGA7",
  },
  {
    name: "Golden gateway",
    distance: 7,
    link: "https://maps.app.goo.gl/SDXJqMh8MKW59LkX7",
  },
  {
    name: "Royal grande",
    distance: 7.9,
    link: "https://maps.app.goo.gl/5VtxtAVYJyaVc2xd7",
  },
  {
    name: "GRT",
    distance: 8.6,
    link: "https://maps.app.goo.gl/eno72SvMpAnCxr1SA",
  },
  {
    name: "Arihanth inn",
    distance: 9.8,
    link: "https://maps.app.goo.gl/HHTWzty7gAEgaTkY7",
  },
  {
    name: "Rangalaya royal",
    distance: 10,
    link: "https://maps.app.goo.gl/fHsNaArzAXMpoGPA7",
  },
  {
    name: "Fabhotel prince park",
    distance: 11,
    link: "https://maps.app.goo.gl/6aBkRZA7Eeft4DFn6",
  },
  {
    name: "Aloka stay inn",
    distance: 11,
    link: "https://maps.app.goo.gl/B3LSvvLvxbACDMj39",
  },
];

const AccomodationPage = () => {
  return (
    <PageContainer title="Accommodation">
      <div className="border rounded w-full max-w-md mx-auto">
        {accomodationData.map((data) => (
          <AccomodationItem data={data} key={data.name} />
        ))}
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <div className="font-medium">CHTC</div>
            <div className="text-muted-foreground">Contact No. 93455 69682</div>
            <div className="text-muted-foreground">
              To be booked before 31st October, 2024
            </div>
            <div className="text-muted-foreground">
              <span>0.3 km from venue</span>
            </div>
          </div>
          <div>
            <a
              target="_blank"
              href="https://maps.app.goo.gl/hqGGDRpBAZ4VcWeH8"
              className="text-muted-foreground hover:text-primary"
              rel="noopener noreferrer"
            >
              <MapIcon />
            </a>
          </div>
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
};

type AccomodationItemProps = {
  data: AccomodationData;
};

const AccomodationItem = ({
  data: { name, distance, link },
}: AccomodationItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-muted-foreground">
            <span>{distance} km from venue</span>
          </div>
        </div>
        <div>
          <a
            target="_blank"
            href={link}
            className="text-muted-foreground hover:text-primary"
            rel="noopener noreferrer"
          >
            <MapIcon />
          </a>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default AccomodationPage;
