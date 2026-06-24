import {
    IconMail,
    IconPhone,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandLeetcode,
    IconMapPin,
    IconCode,
    IconTerminal,
    IconArrowUpRight,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const contactItems = [
    {
        icon: IconMail,
        label: "Email",
        value: "kuldeepsinghtanwar2001@gmail.com",
        href: "mailto:kuldeepsinghtanwar2001@gmail.com",
    },
    {
        icon: IconPhone,
        label: "Phone",
        value: "+91 85699 58265",
        href: "tel:+918569958265",
    },
    {
        icon: IconBrandLinkedin,
        label: "LinkedIn",
        value: "/in/kuldeep-software-developer",
        href: "https://www.linkedin.com/in/kuldeep-software-developer/",
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
        icon: IconTerminal,
        label: "InterviewBit",
        value: "kuldeep1441",
        href: "https://www.interviewbit.com/profile/kuldeep1441/",
    },
    {
        icon: IconMapPin,
        label: "Location",
        value: "Gurugram, Haryana, India",
        href: null,
    },
];

const Contact = () => (
    <section className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-16 mb-28" id="Contact">
        {/* Section heading */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-12"
        >
            <div className="flex items-center gap-3">
                <span className="text-primaryColor font-mono text-sm tracking-widest">06.</span>
                <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">Contact</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
        </motion.div>

        {/* Single unified card */}
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl mx-auto"
        >
            <div className="relative rounded-2xl border border-[#38BDF828] bg-gradient-to-br from-cardBg via-[#0F172A] to-bgColor overflow-hidden shadow-[0_0_80px_0_#38BDF808]">

                {/* Top edge glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-px bg-gradient-to-r from-transparent via-primaryColor/60 to-transparent" />

                {/* Ambient corner glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primaryColor/5 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accentColor/5 blur-3xl pointer-events-none" />

                <div className="relative p-8 sm-mx:p-5">

                    {/* Header */}
                    <div className="text-center mb-7">
                        <h3 className="text-2xl font-bold font-space text-white mb-2 tracking-tight">
                            Get In Touch
                        </h3>
                        <p className="text-textColor text-sm leading-relaxed max-w-xs mx-auto">
                            Open to full-time roles, freelance contracts &amp; interesting collaborations.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF822] to-transparent mb-6" />

                    {/* Contact rows */}
                    <div className="flex flex-col gap-2.5 mb-6">
                        {contactItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noreferrer"
                                        className="group flex items-center gap-3 rounded-xl px-4 py-3 border border-transparent hover:border-[#38BDF828] hover:bg-[#38BDF806] transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 rounded-lg border border-[#38BDF820] bg-[#38BDF80A] flex items-center justify-center flex-shrink-0 group-hover:border-primaryColor/40 group-hover:bg-[#38BDF815] transition-all duration-200">
                                            <item.icon size={14} className="text-primaryColor" />
                                        </div>
                                        <span className="text-xs font-mono text-textColor w-32 flex-shrink-0 uppercase tracking-widest whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <span className="text-sm text-[#CBD5E1] group-hover:text-primaryColor transition-colors duration-200 truncate flex-1">
                                            {item.value}
                                        </span>
                                        <IconArrowUpRight size={13} className="text-textColor/20 group-hover:text-primaryColor flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 rounded-xl px-4 py-3">
                                        <div className="w-8 h-8 rounded-lg border border-[#38BDF818] bg-[#38BDF80A] flex items-center justify-center flex-shrink-0">
                                            <item.icon size={14} className="text-primaryColor/60" />
                                        </div>
                                        <span className="text-xs font-mono text-textColor w-32 flex-shrink-0 uppercase tracking-widest whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <span className="text-sm text-[#CBD5E1] flex-1">{item.value}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF822] to-transparent mb-6" />

                    {/* Status + CTA */}
                    <div className="flex items-center justify-between sm-mx:flex-col sm-mx:gap-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="text-sm text-green-400 font-medium font-mono">
                                Available for new opportunities
                            </span>
                        </div>
                        <a
                            href="mailto:kuldeepsinghtanwar2001@gmail.com"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryColor to-accentColor text-bgColor font-semibold font-space text-sm hover:shadow-[0_0_24px_0_#38BDF845] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                            <IconMail size={14} />
                            Send an Email
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
);

export default Contact;
