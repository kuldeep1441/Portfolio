import { socialLinks } from "../User";

const Social = () => (
    <div className="flex md-mx:hidden flex-col items-center gap-4 fixed bottom-0 left-8 xl-mx:left-4">
        {socialLinks.map((s, i) => (
            <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="text-textColor hover:text-primaryColor hover:-translate-y-0.5 transition-all duration-200"
            >
                <s.icon stroke={1.5} size={19} />
            </a>
        ))}
        <div className="w-px h-20 bg-gradient-to-b from-[#94A3B8] to-transparent mt-1" />
    </div>
);

export default Social;
