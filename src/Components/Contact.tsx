import { useState } from "react";
import {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandLeetcode,
    IconMapPin,
    IconSend,
    IconCode,
} from "@tabler/icons-react";
import { validateForm } from "./Validation";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const celebrate = () =>
    confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#38BDF8", "#14B8A6", "#F1F5F9", "#94A3B8"],
        scalar: 0.9,
        gravity: 1.1,
        ticks: 220,
    });

const contactItems = [
    {
        icon: IconMail,
        label: "Email",
        value: "kuldeepsinghtanwar2001@gmail.com",
        href: "mailto:kuldeepsinghtanwar2001@gmail.com",
    },
    {
        icon: IconBrandLinkedin,
        label: "LinkedIn",
        value: "kuldeep-tanwar-61b748237",
        href: "https://www.linkedin.com/in/kuldeep-tanwar-61b748237/",
    },
    {
        icon: IconBrandGithub,
        label: "GitHub",
        value: "github.com/kuldeep1441",
        href: "https://github.com/kuldeep1441",
    },
    {
        icon: IconBrandLeetcode,
        label: "LeetCode",
        value: "kuldeep1441",
        href: "https://leetcode.com/u/kuldeep1441/",
    },
    {
        icon: IconCode,
        label: "GeeksforGeeks",
        value: "kuldeep1441",
        href: "https://www.geeksforgeeks.org/user/kuldeep1441/",
    },
    {
        icon: IconMapPin,
        label: "Location",
        value: "India · Open to Remote",
        href: null,
    },
];

const InputField = ({
    id, label, value, error, onChange, multiline = false,
}: {
    id: string; label: string; value: string; error: string;
    onChange: (id: string, val: string) => void; multiline?: boolean;
}) => {
    const base =
        `w-full bg-bgColor border rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] focus:outline-none transition-all duration-200 font-mono resize-none ` +
        (error
            ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_#ef444420]"
            : "border-[#38BDF820] focus:border-primaryColor/60 focus:shadow-[0_0_0_3px_#38BDF812]");

    return (
        <div>
            {multiline ? (
                <textarea
                    id={id}
                    rows={5}
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    placeholder={label}
                    className={base}
                />
            ) : (
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    placeholder={label}
                    className={base}
                />
            )}
            {error && <p className="text-red-400 text-xs mt-1.5 ml-1 font-mono">{error}</p>}
        </div>
    );
};

const Contact = () => {
    const blank = { name: "", email: "", phone: "", message: "" };
    const [formData, setFormData] = useState<Record<string, string>>(blank);
    const [formError, setFormError] = useState<Record<string, string>>(blank);
    const [sending, setSending] = useState(false);

    const handleChange = (id: string, value: string) => {
        setFormData((p) => ({ ...p, [id]: value }));
        setFormError((p) => ({ ...p, [id]: validateForm(id, value) }));
    };

    const handleSubmit = async () => {
        let valid = true;
        const errors: Record<string, string> = {};
        for (const key in formData) {
            const e = validateForm(key, formData[key]);
            if (e) { errors[key] = e; valid = false; }
        }
        setFormError(errors);
        if (!valid) { toast.error("Please fill all fields correctly."); return; }

        setSending(true);
        emailjs
            .send("service_1eq6z4k", "template_5e1dnwq",
                { name: formData.name, email: formData.email, phone: formData.phone, message: formData.message },
                "_D1BTS65aLdnHE8-A")
            .then(
                () => {
                    celebrate();
                    toast.success("Message sent! I'll get back to you soon.", { duration: 4000 });
                    setFormData(blank);
                },
                () => toast.error("Send failed — please email directly.", { duration: 4000 })
            )
            .finally(() => setSending(false));
    };

    return (
        <section className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-16" id="Contact">
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="flex items-center gap-3">
                    <span className="text-primaryColor font-mono text-sm tracking-widest">05.</span>
                    <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">
                        Contact
                    </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex gap-8 lg-mx:flex-col max-w-5xl mx-auto"
            >
                {/* ── Left: Info panel ── */}
                <div className="w-[42%] lg-mx:w-full flex flex-col gap-4">
                    <div className="border border-[#38BDF818] bg-gradient-to-br from-cardBg to-bgColor rounded-2xl p-7 sm-mx:p-5 flex flex-col gap-6">
                        <div>
                            <h3 className="text-xl font-semibold font-space text-white mb-2">
                                Let's Build Something Great
                            </h3>
                            <p className="text-textColor text-sm leading-[1.8]">
                                Open to full-time roles, freelance contracts, and interesting collaborations. Drop me a message and I'll respond within 24 hours.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {contactItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg border border-[#38BDF820] bg-[#38BDF808] flex items-center justify-center flex-shrink-0 group-hover:border-primaryColor/40 group-hover:bg-[#38BDF812] transition-all duration-200">
                                        <item.icon size={14} className="text-primaryColor" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-textColor uppercase tracking-[0.15em] font-mono">
                                            {item.label}
                                        </div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel="noreferrer"
                                                className="text-xs text-[#CBD5E1] hover:text-primaryColor transition-colors duration-200 break-all"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-xs text-[#CBD5E1]">{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-[#38BDF810] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                            <span className="text-xs text-green-400 font-medium font-mono">
                                Available for new opportunities
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Right: Form ── */}
                <div className="flex-1 border border-[#38BDF818] bg-gradient-to-br from-cardBg to-bgColor rounded-2xl p-7 sm-mx:p-5">
                    <h3 className="text-lg font-semibold font-space text-white mb-5">Send a Message</h3>
                    <div className="flex flex-col gap-4">
                        <InputField id="name" label="Full Name" value={formData.name} error={formError.name} onChange={handleChange} />
                        <InputField id="email" label="Email Address" value={formData.email} error={formError.email} onChange={handleChange} />
                        <InputField id="phone" label="Phone Number" value={formData.phone} error={formError.phone} onChange={handleChange} />
                        <InputField id="message" label="Your message..." value={formData.message} error={formError.message} onChange={handleChange} multiline />

                        <button
                            onClick={handleSubmit}
                            disabled={sending}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primaryColor to-accentColor text-bgColor font-semibold font-space text-sm hover:shadow-[0_0_24px_0_#38BDF840] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <IconSend size={15} />
                            {sending ? "Sending…" : "Send Message"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
