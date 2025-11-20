
import { GetProfileInfo, UpdateProfileInfo, UploadUserImage } from "@/API/UserAPI";

import Loader from "@/Components/Loader/Loader";
import { handleError, handleSuccess } from "@/Util/Alerts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdCameraAlt, MdEdit } from "react-icons/md";

/** Tiny Card wrapper */
const Card = ({ children, className = "" }) => (
  <div className={`rounded-[20px] bg-white p-6 shadow-3xl ${className}`}>{children}</div>
);

export default function UserEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(blankUser());
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Fetch user
  const userQ = useQuery({
    queryKey: ["Get-User-Data"],
    queryFn: GetProfileInfo,
    staleTime: 1000 * 60 * 60 * 12,
    retry: 2,
  });

  // Normalize incoming user once loaded (support {success,data} shape)
  const user = useMemo(() => userQ.data?.data ?? userQ.data ?? null, [userQ.data]);

  useEffect(() => {
    if (!userQ.isLoading && user) {
      setTemp(normalizeUser(user));
      setAvatarPreview(user.profilePic || "");
      setBannerPreview(user.banner || "");
      setAvatarFile(null);
      setBannerFile(null);
    }
  }, [userQ.isLoading, user]);

  // Clean up object URLs
  useEffect(() => () => {
    if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    if (bannerPreview?.startsWith("blob:")) URL.revokeObjectURL(bannerPreview);
  }, [avatarPreview, bannerPreview]);

  if (userQ.isLoading) return <Loader />;
  if (userQ.isError) {
    handleError(userQ.error?.message || "Failed to load user");
    return null;
  }

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setTemp(normalizeUser(user));
    setAvatarFile(null);
    setBannerFile(null);
    setAvatarPreview(user.profilePic || "");
    setBannerPreview(user.banner || "");
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Required checks
      if (!temp.name.trim()) return handleError("Name is required.");
      if (!/^\S+@\S+\.\S+$/.test(temp.email)) return handleError("Enter a valid email.");

      // Upload flows (only if user picked new files)
      let profilePicUrl = temp.profilePic || "";
      let bannerUrl = temp.banner || "";

      if (avatarFile) {
        const up = await UploadUserImage({
          photo: user?.profilePic || "", // delete existing avatar on server if needed
          image: avatarFile,
          type:"profile"
        });
        if (!up?.success) throw new Error(up?.message || "Avatar upload failed");
        profilePicUrl = up.data?.[0]?.url || profilePicUrl;
        // handleSuccess("Uploaded Profile Pic")
      }

      if (bannerFile) {
        const up = await UploadUserImage({
          photo: user?.banner || "", // delete existing banner if needed
          image: bannerFile,
          type:"banner"
        });
        if (!up?.success) throw new Error(up?.message || "Banner upload failed");
        bannerUrl = up.data?.[0]?.url || bannerUrl;
        // handleSuccess("Uploaded Banner")
      }

      // Final payload
      const payload = {
        ...temp,
        profilePic: profilePicUrl,
        banner: bannerUrl,
      };

      // Update user profile
      const resp = await UpdateProfileInfo(payload); // ensure your API returns {success, data}
      if (!resp?.success) throw new Error(resp?.message || "Failed to update profile");

      handleSuccess("Profile updated");
      setIsEditing(false);
      // refresh cache
      userQ.refetch();
    } catch (err) {
      handleError(err?.message || "Failed to save changes");
    }
  };

  // Handlers: previews + picks
  const onAvatarChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type?.startsWith("image/")) return handleError("Please select a valid image.");
    const url = URL.createObjectURL(f);
    if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(f);
    setAvatarPreview(url);
  };

  const onBannerChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type?.startsWith("image/")) return handleError("Please select a valid image.");
    const url = URL.createObjectURL(f);
    if (bannerPreview?.startsWith("blob:")) URL.revokeObjectURL(bannerPreview);
    setBannerFile(f);
    setBannerPreview(url);
  };

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
              className="linear flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover active:bg-brand-active focus:outline-none focus:ring-2 focus:ring-focus-ring"
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
                className="linear flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== Banner + Avatar (both previewable) ===== */}
      <div className="relative mt-6">
        {/* Banner */}
        <div
          className={`h-32 w-full rounded-xl bg-cover bg-center ${
            isEditing ? "group/banner cursor-pointer" : ""
          }`}
          style={{
            backgroundImage: bannerPreview
              ? `url(${bannerPreview})`
              : "linear-gradient(45deg, #e9ddd5, #b1d4e9)",
          }}
          onClick={isEditing ? () => bannerInputRef.current?.click() : undefined}
          role={isEditing ? "button" : undefined}
          tabIndex={isEditing ? 0 : -1}
          onKeyDown={(e) => isEditing && e.key === "Enter" && bannerInputRef.current?.click()}
          aria-label={isEditing ? "Edit banner" : "Profile banner"}
        >
          {isEditing && (
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover/banner:bg-black/30 transition-colors grid place-items-center pointer-events-none">
              <div className="opacity-0 group-hover/banner:opacity-100 transition-opacity text-white inline-flex items-center gap-2 text-sm">
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

        {/* Avatar */}
        <div
          className={`absolute left-1/2 -bottom-12 -translate-x-1/2 h-[96px] w-[96px] rounded-full border-[4px] border-white overflow-hidden bg-stone-200 ${
            isEditing ? "group/avatar cursor-pointer" : ""
          }`}
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
          {avatarPreview ? (
            <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-stone-600">
              <span className="text-base font-semibold">
                {(temp.name || "U").slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
          {isEditing && (
            <div className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/35 transition-colors grid place-items-center pointer-events-none">
              <div className="opacity-0 group-hover/avatar:opacity-100 transition-opacity text-white text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/30">
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

      {/* Name + location */}
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

      {/* Fields */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Name" editing={isEditing} value={temp.name}
               onChange={(v) => setTemp((s) => ({ ...s, name: v }))} editInputCls={editInputCls} readBoxCls={readBoxCls}/>
        <Field label="Email" type="email" editing={isEditing} value={temp.email}
               onChange={(v) => setTemp((s) => ({ ...s, email: v }))} editInputCls={editInputCls} readBoxCls={readBoxCls}/>
        <Field label="Phone" type="tel" editing={isEditing} value={temp.phone ?? ""}
               onChange={(v) => setTemp((s) => ({ ...s, phone: v }))} editInputCls={editInputCls} readBoxCls={readBoxCls}/>
        <Field label="City" editing={isEditing} value={temp.city}
               onChange={(v) => setTemp((s) => ({ ...s, city: v }))} editInputCls={editInputCls} readBoxCls={readBoxCls}/>
        <Field label="State" editing={isEditing} value={temp.state}
               onChange={(v) => setTemp((s) => ({ ...s, state: v }))} editInputCls={editInputCls} readBoxCls={readBoxCls}/>
        <Field label="Address" editing={isEditing} value={temp.address}
               onChange={(v) => setTemp((s) => ({ ...s, address: v }))} className="lg:col-span-2" editInputCls={editInputCls} readBoxCls={readBoxCls}/>
      </div>

      {/* Password actions (stub) */}
      <div className="mt-8">
        <label className="text-sm font-medium text-ink-primary">Password</label>
        <div className={`${readBoxCls} mt-2 flex items-center justify-between`}>
          <span className="text-sm font-medium text-ink-secondary">••••••••••••</span>
          <button
            onClick={() => handleSuccess("Password reset flow not connected")}
            className="text-sm font-semibold text-brand hover:text-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-full px-3 py-1"
          >
            Reset Password
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ---------- helpers ---------- */

function blankUser() {
  return {
    name: "",
    email: "",
    profilePic: "",
    phone: "",
    petID: [],
    city: "",
    state: "",
    address: "",
    banner: "",
  };
}

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

function Field({ label, value, onChange, editing, type = "text", className = "", editInputCls, readBoxCls }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-ink-primary">{label}</label>
      {editing ? (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={editInputCls} />
      ) : (
        <div className={readBoxCls}>{value || <span className="text-ink-secondary/70">—</span>}</div>
      )}
    </div>
  );
}
