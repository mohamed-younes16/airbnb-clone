import { GetReservationById } from "@/actions";
import Heading from "@/components/Heading";
import TripForm from "@/components/forms/TripForm";

const page = async ({ params: { tripId } }: { params: { tripId: string } }) => {
  const trip = await GetReservationById(tripId);

  return (
    <div className="px-4">
      <Heading
        title="Review"
        description="Leave A Review of the place please be polite"
      />
      {trip && (
        <TripForm
          userData={trip.owner}
          review={trip?.review}
          tripId={tripId}
        />
      )}
    </div>
  );
};

export default page;
