import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdEdit, MdCameraAlt } from "react-icons/md";
import { Camera, X, ChevronDown, PawPrint } from "lucide-react";

/** Replace with your Card component if present */
const Card = ({ children, className = "" }) => (
  <div className={`rounded-[20px] bg-white p-6 shadow-3xl ${className}`}>{children}</div>
);

/**
 * Props:
 * - user: {
 *     _id?, name, email, profilePic, phone, petID: string[],
 *     city, state, address, banner?
 *   }
 * - pets: Array<{ _id: string, name: string }>
 * - onUpdateUser: (updatedUser) => void|Promise<void>
 * - onResetPassword: () => void|Promise<void>
 * - onImageUpload: (file: File, kind: 'avatar'|'banner') => void|Promise<void>
 */
export default function UserEditor({
  user,
  pets = [],
  onUpdateUser,
  onResetPassword,
  onImageUpload,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(() => normalizeUser(user));
  // even though pets editing is removed, we still compute names
  const petMap = useMemo(() => new Map(pets.map((p) => [String(p._id), p.name])), [pets]);

  // file inputs
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    if (!isEditing) setTemp(normalizeUser(user));
  }, [user, isEditing]);

  function normalizeUser(u = {}) {
    return {
      name: u.name || "",
      email: u.email || "",
      profilePic: u.profilePic || "",
      phone: u.phone ?? "",
      petID: Array.isArray(u.petID) ? u.petID.map(String) : [],
      city: u.city || "",
      state: u.state || "",
      address: u.address || "",
      banner: u.banner || "",
    };
  }

  const handleEdit = () => {
    setTemp(normalizeUser(user));
    setIsEditing(true);
  };
  const handleCancel = () => {
    setTemp(normalizeUser(user));
    setIsEditing(false);
  };
  const handleSave = async () => {
    if (!temp.name.trim()) return alert("Name is required.");
    if (!/^\S+@\S+\.\S+$/.test(temp.email)) return alert("Enter a valid email.");
    if (onUpdateUser) await onUpdateUser(temp);
    setIsEditing(false);
  };
  const handleInput = (field, value) => setTemp((s) => ({ ...s, [field]: value }));

  const selectedPetNames = temp.petID
    .map((id) => petMap.get(String(id)))
    .filter(Boolean);

  // image handlers (clickable only in edit mode)
  const triggerAvatar = () => isEditing && avatarInputRef.current?.click();
  const triggerBanner = () => isEditing && bannerInputRef.current?.click();

  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) await onImageUpload(file, "avatar");
  };
  const onBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) await onImageUpload(file, "banner");
  };

  // Shared input styles
  const editInputCls =
    "w-full rounded-full bg-app-surface/50 px-4 py-2.5 text-sm text-ink-primary outline-none focus:ring-2 focus:ring-focus-ring";
  const readBoxCls =
    "w-full rounded-full border border-ink-primary/30 bg-white/60 px-4 py-2.5 text-sm text-ink-primary";

  return (
    <Card className="px-4 py-2 md:py-4 lg:mx-12 flex-1 mt-8 bg-app-elevated">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-left text-2xl font-quicksandBold leading-9 text-ink-heading">
            Update Your Profile
          </h5>
          <p className="mt-1 text-sm text-ink-secondary/80">Edit your details and media</p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="linear flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-hover active:bg-brand-active focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <MdEdit className="text-lg" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="linear flex items-center px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="linear flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-green-700 "
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== Banner + Avatar (independent hovers) ===== */}
      <div className="relative mt-6">
        {/* Banner container (own hover group) */}
        <div
          className={`h-32 w-full rounded-xl bg-cover bg-center ${isEditing ? "group/banner cursor-pointer" : ""}`}
          style={{
            backgroundImage: temp.banner
              ? `url(${temp.banner})`
              : "linear-gradient(45deg, #e9ddd5, #b1d4e9)",
          }}
          onClick={isEditing ? () => bannerInputRef.current?.click() : undefined}
          role={isEditing ? "button" : undefined}
          tabIndex={isEditing ? 0 : -1}
          onKeyDown={(e) => isEditing && e.key === "Enter" && bannerInputRef.current?.click()}
          aria-label={isEditing ? "Edit banner" : "Profile banner"}
        >
          {/* Banner overlay (only when hovering the banner) */}
          {isEditing && (
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover/banner:bg-black/30 transition-colors duration-200 grid place-items-center pointer-events-none">
              <div className="opacity-0 group-hover/banner:opacity-100 transition-opacity duration-200 text-white inline-flex items-center gap-2 text-sm">
                <MdCameraAlt className="text-lg" />
                Edit Banner
              </div>
            </div>
          )}
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={onBannerChange}
            className="hidden"
          />
        </div>

        {/* Avatar: sibling absolutely positioned (own hover group) */}
        <div
          className={`absolute left-1/2 -bottom-12 -translate-x-1/2 h-[96px] w-[96px] rounded-full border-[4px] border-white overflow-hidden bg-stone-200 ${isEditing ? "group/avatar cursor-pointer" : ""}`}
          onClick={(e) => {
            if (!isEditing) return;
            e.stopPropagation();
            avatarInputRef.current?.click();
          }}
          role={isEditing ? "button" : undefined}
          tabIndex={isEditing ? 0 : -1}
          onKeyDown={(e) => isEditing && e.key === "Enter" && avatarInputRef.current?.click()}
          aria-label={isEditing ? "Edit profile picture" : "Profile picture"}
        >
          {temp.profilePic ? (
            <img src={temp.profilePic} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-stone-600">
              <span className="text-base font-semibold">
                {(temp.name || "U").slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}

          {/* Avatar overlay (only when hovering the avatar) */}
          {isEditing && (
            <div className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/35 transition-colors duration-200 grid place-items-center pointer-events-none">
              <div className="opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 text-white text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/30">
                <MdCameraAlt className="text-sm" />
                Change Photo
              </div>
            </div>
          )}

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Name + location (hide empty location entirely) */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-ink-heading">{temp.name || "User"}</h4>
        {([temp.city, temp.state].filter(Boolean).length > 0) && (
          <p className="text-base text-ink-secondary/80">
            {[temp.city, temp.state].filter(Boolean).join(", ")}
          </p>
        )}
        {temp.address ? (
          <p className="mt-1 text-sm text-ink-secondary/70 line-clamp-1">{temp.address}</p>
        ) : null}
      </div>

      {/* Core fields */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field
          label="Name"
          editing={isEditing}
          value={temp.name}
          onChange={(v) => handleInput("name", v)}
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
        <Field
          label="Email"
          type="email"
          editing={isEditing}
          value={temp.email}
          onChange={(v) => handleInput("email", v)}
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
        <Field
          label="Phone"
          type="tel"
          editing={isEditing}
          value={temp.phone}
          onChange={(v) => handleInput("phone", v)}
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
        <Field
          label="City"
          editing={isEditing}
          value={temp.city}
          onChange={(v) => handleInput("city", v)}
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
        <Field
          label="State"
          editing={isEditing}
          value={temp.state}
          onChange={(v) => handleInput("state", v)}
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
        <Field
          label="Address"
          editing={isEditing}
          value={temp.address}
          onChange={(v) => handleInput("address", v)}
          className="lg:col-span-2"
          editInputCls={editInputCls}
          readBoxCls={readBoxCls}
        />
      </div>

      {/* Password actions */}
      <div className="mt-8">
        <label className="text-sm font-medium text-ink-primary">Password</label>
        <div className={`${readBoxCls} mt-2 flex items-center justify-between`}>
          <span className="text-sm font-medium text-ink-secondary">••••••••••••</span>
          <button
            onClick={async () => {
              if (onResetPassword) await onResetPassword();
              else alert("Password reset flow not connected.");
            }}
            className="text-sm font-semibold text-brand hover:text-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-full px-3 py-1"
          >
            Reset Password
          </button>
        </div>
      </div>
    </Card>
  );
}

/** Field helper that flips styles with edit mode */
function Field({
  label,
  value,
  onChange,
  editing,
  type = "text",
  className = "",
  editInputCls,
  readBoxCls,
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-ink-primary">{label}</label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={editInputCls}
        />
      ) : (
        <div className={readBoxCls}>
          {value || <span className="text-ink-secondary/70">—</span>}
        </div>
      )}
    </div>
  );
}
