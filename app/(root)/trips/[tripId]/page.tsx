import { GetReservationById } from "@/actions";
import Heading from "@/components/Heading";
import TripForm from "@/components/forms/TripForm";

const page = async ({ params: { tripId } }: { params: { tripId: string } }) => {
  const trip = await GetReservationById(tripId);
  console.log(trip)
  return (
    <div>
      <Heading
        title="Review"
        description="Leave A Review of the place please be polite"
      />
      <TripForm review={trip?.review!} tripId={tripId} />
    </div>
  );
};

export default page;
