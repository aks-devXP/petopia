// ProfileBanner.jsx
import Card from "@components/card";
import { Mail, PawPrint, Phone } from "lucide-react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfileBanner = ({ profileData = {}, className = "" }) => {
  const navigate = useNavigate();

  const {
    name = "",
    email = "",
    phone = "",
    petID = [],
    profilePic = "",
    city = "",
    state = "",
    address = "",
    banner = "",
  } = profileData;

  const displayName = name || "User";
  const petsCount = Array.isArray(petID) ? petID.length : 0;

  const goEdit = (e) => {
    e?.stopPropagation?.();
    navigate("/edit-user");
  };

  return (
    // NOTE: no w-full here; allow intrinsic sizing
    <Card extra={`items-center h-full p-[16px] bg-cover ${className}`}>
      {/* Static banner; no hover/click */}
      <div
        className="relative h-32 w-full rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: banner
            ? `url(${banner})`
            : "linear-gradient(45deg, #e9ddd5, #b1d4e9)",
        }}
      >
        {/* Avatar */}
        <div
          className="absolute left-1/2 -bottom-12 -translate-x-1/2 h-[96px] w-[96px]
                     rounded-full border-[4px] border-white overflow-hidden bg-stone-200"
        >
          {profilePic ? (
            <img
              className="h-full w-full object-cover"
              src={profilePic}
              alt="Profile"
              draggable={false}
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-ink-secondary">
              <span className="text-base font-semibold">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}

          {/* Pencil: visible, not clipped; only action */}
          <button
            type="button"
            onClick={goEdit}
            title="Edit Profile"
            className="absolute bottom-2 right-2 grid place-items-center
                       h-7 w-7 rounded-full bg-brand text-white
                       shadow-lg ring-2 ring-white hover:bg-brand-hover
                       active:bg-brand-active transition"
          >
            <MdEdit className="text-sm" />
          </button>
        </div>
      </div>

      {/* Name & optional location */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-ink-primary">{displayName}</h4>

        {([city, state].filter(Boolean).length > 0) && (
          <p className="text-base font-normal text-ink-secondary">
            {[city, state].filter(Boolean).join(", ")}
          </p>
        )}

        {address ? (
          <p className="mt-1 text-sm text-ink-secondary line-clamp-1">{address}</p>
        ) : null}
      </div>

      {/* Stats row */}
      <div className="mt-6 mb-3 grid grid-cols-3 gap-4 md:!gap-14">
        <Stat icon={<PawPrint className="h-4 w-4 text-brand" />} value={petsCount} label="Pets Linked" />
        <Stat icon={<Mail className="h-4 w-4 text-brand" />} value={email ? email.split('@')[0].slice(0,7) : "—"} label="Email" title={email} />
        <Stat icon={<Phone className="h-4 w-4 text-brand" />} value={phone ? phone.toString().slice(0,5) : "—"} label="Phone" title={String(phone || "")} />
      </div>
    </Card>
  );
};

function Stat({ icon, value, label, title }) {
  return (
    <div className="flex flex-col items-center justify-center" title={title}>
      <div className="flex items-center gap-1">
        {icon}
        <p className="text-2xl font-bold text-ink-primary">{value}</p>
      </div>
      <p className="text-sm font-normal text-ink-secondary">{label}</p>
    </div>
  );
}

export default ProfileBanner;
