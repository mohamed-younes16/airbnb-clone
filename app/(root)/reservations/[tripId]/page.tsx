import { GetReservationById } from "@/actions";
import Heading from "@/components/Heading";
import TripForm from "@/components/forms/TripForm";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { TbZoomCancel } from "react-icons/tb";

const page = async ({ params: { tripId } }: { params: { tripId: string } }) => {
  const trip = await GetReservationById(tripId);

  return (
    <div className="px-4">
      {trip ? (
        <>
          <Heading
            title="Review"
            description="Leave A Review of the place please be polite"
          />
          <TripForm
            userData={trip.owner}
            review={trip?.review}
            tripId={tripId}
          />
        </>
      ) : (
        <>
          <div className="flexcenter h-[50dvh] flex-col text-center">
            <Heading
              title="Looks like you Are in the wrong page"
              description=""
            />
            <AlertCircle className="h-14 w-14 mt-4" />
            <Button className="mt-8" variant={"outline"}>
              <Link href={"/"}>Return to main page</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
