// src/Pages/contact/ContactUs.jsx
import { useState } from "react";
import { MessageCircle, Phone, MapPin, Send } from "lucide-react";
import { ContactAPI } from "@/API/GeneralAPI";
import { handleError, handleSuccess } from "@/Util/Alerts";

/**
 * Props:
 * - phone, address, email, hours, responseTime, onSubmit?
 */
export default function ContactUs({
  phone = "+1 332 245 666",
  address = "IIIT Delhi, New Delhi, India",
  email = "support@petopia.app",
  hours = "Available 9 AM to 6 PM",
  responseTime = "We will respond to you within 24 hours.",
  onSubmit,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "", // required by backend: "Who are you"
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mailHref = `mailto:${email}`;

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Backend expects { name, email, category, message }
    const name = `${form.firstName || ""} ${form.lastName || ""}`.trim() || form.firstName || form.lastName;
    const payload = {
      name,
      email: form.email,
      category: form.category,
      message: form.message,
    };

    try {
      setIsSubmitting(true);
      if (onSubmit) onSubmit({ ...form, name }); // optional tap for analytics

      const res = await ContactAPI(payload);
      const info = await res.json();

      if (info?.success) {
        handleSuccess(info.message || "Message sent.");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          category: "",
          subject: "",
          message: "",
        });
      } else {
        handleError(info?.message || "Something went wrong.");
      }
    } catch (err) {
      handleError(err?.message || String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-2 sm:mx-12  bg-white rounded-3xl shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left rail */}
          <aside className="lg:col-span-2 p-6 sm:p-8">
            <div className="inline-flex items-center rounded-full border border-brand/30 bg-app-surface px-3 py-1 text-xs font-semibold text-ink-primary">
              Contact Us
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-quicksandBold text-ink-primary">
              We’re Here to Help!
            </h2>

            <p className="mt-2 text-sm text-ink-secondary/80 leading-6">
              Have questions or need assistance? Contact us for support or to
              discuss your project.
            </p>

            <ul className="mt-6 space-y-4">
              {/* Chat */}
              <li className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-app-surface ring-1 ring-black/10">
                  <MessageCircle className="h-4.5 w-4.5 text-ink-primary" />
                </span>
                <div>
                  <div className="font-semibold text-ink-primary">Chat with us</div>
                  <a
                    href={mailHref}
                    className="text-sm text-ink-secondary/80 hover:text-ink-primary underline-offset-2 hover:underline"
                  >
                    {responseTime}
                  </a>
                </div>
              </li>

              {/* Call */}
              <li className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-app-surface ring-1 ring-black/10">
                  <Phone className="h-4.5 w-4.5 text-ink-primary" />
                </span>
                <div>
                  <div className="font-semibold text-ink-primary">Call Us</div>
                  <div className="text-sm text-ink-secondary/80">
                    <a href={telHref} className="hover:text-ink-primary underline-offset-2 hover:underline">
                      {phone}
                    </a>{" "}
                    — {hours}
                  </div>
                </div>
              </li>

              {/* Visit */}
              <li className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-app-surface ring-1 ring-black/10">
                  <MapPin className="h-4.5 w-4.5 text-ink-primary" />
                </span>
                <div>
                  <div className="font-semibold text-ink-primary">Visit Us</div>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink-secondary/80 hover:text-ink-primary underline-offset-2 hover:underline"
                  >
                    {address}
                  </a>
                </div>
              </li>
            </ul>
          </aside>

          {/* Right form */}
          <div className="lg:col-span-3 p-6 sm:p-8">
            <form
              onSubmit={submit}
              className="rounded-2xl ring-1 ring-black/5 bg-white p-5 sm:p-6"
            >
              {/* Row 1: First / Last */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-secondary/80">First Name</label>
                  <input
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handle}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-secondary/80">Last Name</label>
                  <input
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handle}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email / Phone */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-secondary/80">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={form.email}
                    onChange={handle}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-secondary/80">
                    Phone <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    name="phone"
                    placeholder={phone}
                    value={form.phone}
                    onChange={handle}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>
              </div>

              {/* Row 3: Category (Who are you) */}
              <div className="mt-4">
                <label className="text-sm text-ink-secondary/80">Who are you</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handle}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/40"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="petOwner">Pet Owner</option>
                  <option value="veterinaryDoc">Veterinary Doc</option>
                  <option value="petTrainer">Pet Trainer</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Row 4: Subject (optional) */}
              <div className="mt-4">
                <label className="text-sm text-ink-secondary/80">Subject (optional)</label>
                <input
                  name="subject"
                  placeholder="Which topic are you interested in"
                  value={form.subject}
                  onChange={handle}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              {/* Row 5: Message */}
              <div className="mt-4">
                <label className="text-sm text-ink-secondary/80">Your Message</label>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handle}
                  rows={5}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-ink-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
                  required
                />
              </div>

              {/* Submit */}
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    inline-flex items-center gap-2 rounded-full px-5 py-2.5
                    shadow-sm ring-1 ring-brand/30 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                    ${isSubmitting ? "bg-ink-secondary/30 text-ink-primary/60 cursor-not-allowed" : "bg-brand text-white hover:shadow-md hover:-translate-y-0.5"}
                  `}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Now"}</span>
                  <Send className={`h-4.5 w-4.5 ${isSubmitting ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
