import { createAppointment } from "@/API/AppointmentAPI";
import { GetPets } from "@/API/PetApi";
import { getProviderById } from "@/API/ServiceProviders";
import { getOne } from "@/API/mockProviders";
import { handleError, handleSuccess } from "@/Util/Alerts";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProviderHero from "./components/ProviderHero";
import ScheduleSidebar from "./components/ScheduleSidebar";
import ServiceShowcase from "./components/ServiceShowcase";
import TestimonialsSection from "./components/TestimonialsSection";
import { buildProviderProfile } from "./utils/profileBuilder";

const TYPE_LABELS = {
  vet: "Veterinary Specialist",
  trainer: "Certified Trainer",
  groomer: "Pet Grooming Studio",
};

const ProviderBooking = ({ forcedType, forcedId }) => {
  const params = useParams();
  const navigate = useNavigate();

  const type = forcedType ?? params.type ?? "vet";
  const providerId = forcedId ?? params.id;
  const typeLabel = TYPE_LABELS[type];

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: Boolean(typeLabel && providerId),
    queryKey: ["provider-booking", type, providerId],
    queryFn: async () => {
      if (type === "vet") {
        const vet = await getProviderById({type, id:providerId});
        if (vet) return { source: "api", payload: vet };
      }
      else if(type==="trainer"){
        const trainer = await getProviderById({type, id:providerId});
        if (trainer) return { source: "api", payload: trainer };
      }
      else if(type==="groomer"){
        const groomer = await getProviderById({type, id:providerId});
        if (groomer) return { source: "api", payload: groomer };
      }
      const fallback = getOne(type, providerId);
      if (fallback) return { source: "static", payload: fallback };
      throw new Error("Provider not found. Please try a different specialist.");
    },
  });
  const petQuery = useQuery(
    {
      queryKey : ["UserPets"],
      queryFn: async ()=>GetPets(),
      enabled: Boolean(localStorage.getItem("token")),
      retry: 2,
    }
  );

  const profile = useMemo(() => {
    if (!data || !typeLabel) return null;
    return buildProviderProfile(type, typeLabel, data);
  }, [data, type, typeLabel]);

  const handleConfirm = async ({ day, slot, addons, total, pet }) => {
    try {
      if (!profile || !day || !slot) return;
      const reference = `APT-${Date.now().toString().slice(-6)}`;
      const appointmentCreated = await createAppointment({
        authority_id: profile.id,
        type,
        date:new Date(day.dateDisplay).toISOString(),
        time:slot.label,
        serviceCost:total,
        pet_id:pet._id,
        addons,
      })
      if(appointmentCreated){
      handleSuccess("Your slot is reserved while we complete the booking.");
      navigate("/appointment-success", {
        state: {
          appointmentData: {
            providerName: profile.name,
            providerType: profile.typeLabel,
            date: day.dateDisplay,
            dayLabel: day.label,
            time: slot.label,
            slotMeta: slot.meta,
            location: {
              city: profile.location.city,
              state: profile.location.state,
            },
            currencySymbol: profile.currencySymbol,
            total,
            addons,
            support: {
              email: "care@petopia.in",
              phone: "+91 99887 76654",
            },
            reference,
            createdAt: new Date().toISOString(),
          },
        },
      });
    }
    } 
    catch (error) {
      handleError(error?.message|| "Failed to book appointment. Please try again.");
    }
  };

  if (!typeLabel) {
    return (
      <div className="min-h-[60vh] grid place-content-center bg-app-bg text-center px-6">
        <div className="max-w-xl space-y-3">
          <h2 className="text-2xl font-quicksandBold text-ink-heading">
            Coming soon
          </h2>
          <p className="text-ink-secondary/80">
            We are curating premium specialists for this service category. Check
            back shortly or explore another care vertical in Petopia.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !profile || petQuery.isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-app-bg">
        <Loader />
      </div>
    );
  }
  // else{
  //   console.log(data);
  // }
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-app-bg px-6">
        <div className="max-w-lg rounded-3xl bg-white shadow-xl border border-app-surface/60 p-8 text-center space-y-3">
          <h2 className="text-xl font-quicksandBold text-ink-heading">
            We could not load that specialist
          </h2>
          <p className="text-ink-secondary/80">
            {error?.message ||
              "The profile you are looking for is currently unavailable. Try exploring other experts nearby."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-bg via-app-surface/60 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-10">
            <ProviderHero profile={profile} />
            {/* <HighlightsGrid metrics={profile.metrics} /> */}
            <ServiceShowcase profile={profile} />
            {profile.testimonials.length > 0 ? (
              <TestimonialsSection testimonials={profile.testimonials} />
            ) : null}
          </div>

          <ScheduleSidebar profile={profile} onConfirm={handleConfirm}  pets={petQuery.data}/>
        </div>
      </div>
    </div>
  );
};

export default ProviderBooking;
