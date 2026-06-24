import { Badge, Indicator, Modal } from "@mantine/core";
import { IconBrandGithub, IconExternalLink, IconLock, IconBrandGooglePlay, IconX } from "@tabler/icons-react";

const FullProjectModal = (props: any) => {
    const hasLinks = props.github || props.website || props.playStore;

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            centered
            withCloseButton={false}
            padding={0}
            radius="lg"
            size={900}
            overlayProps={{ backgroundOpacity: 0.72, blur: 4 }}
            classNames={{
                content: "!bg-cardBg !overflow-hidden !max-w-[94vw]",
                body: "!p-0",
            }}
        >
            {/* Close button */}
            <button
                onClick={props.close}
                aria-label="Close"
                className="absolute top-3 right-3 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-bgColor/70 backdrop-blur text-textColor hover:text-white hover:bg-bgColor transition-all duration-200"
            >
                <IconX size={16} />
            </button>

            <div className="grid md-mx:grid-cols-1 grid-cols-2">
                {/* ── Left: title · skills · image · description ── */}
                <div className="flex flex-col p-6 sm-mx:p-5 border-r md-mx:border-r-0 md-mx:border-b border-[#38BDF815]">
                    {/* Title + live badge */}
                    <div className="flex items-center gap-2 flex-wrap pr-8 mb-4">
                        <h3 className="text-2xl sm-mx:text-xl font-bold text-white font-space leading-tight">
                            {props.title}
                        </h3>
                        {props.live && (
                            <Badge size="sm" variant="outline" color="red"
                                rightSection={<Indicator color="red" position="middle-end" size={7} processing />}>
                                Live
                            </Badge>
                        )}
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {props.technologies.map((tech: string, i: number) => (
                            <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-[#38BDF825] bg-[#38BDF808] text-primaryColor">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Framed preview — full 16:10 screenshot, sharp */}
                    <div className="rounded-xl overflow-hidden border border-[#38BDF820] shadow-[0_12px_34px_0_#00000060]">
                        <img
                            src={`${process.env.PUBLIC_URL}/${props.image}`}
                            alt={props.title}
                            className="w-full aspect-[16/10] object-cover object-top"
                        />
                    </div>

                    {/* Description */}
                    <p className="text-textColor/75 text-[12px] leading-[1.8] mt-4">
                        {props.desc}
                    </p>
                </div>

                {/* ── Right: highlights · live buttons ── */}
                <div className="flex flex-col p-6 sm-mx:p-5 max-h-[84vh] overflow-y-auto">
                    <span className="text-primaryColor font-mono text-[11px] tracking-[0.2em] uppercase mb-3">
                        Key Highlights
                    </span>

                    {props.points?.length > 0 && (
                        <ul className="flex flex-col gap-3 mb-6 flex-1">
                            {props.points.map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-2.5 text-[13px] sm-mx:text-xs text-textColor leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primaryColor flex-shrink-0 mt-[6px]" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Action buttons — one per platform the project is live on */}
                    <div className="flex flex-wrap gap-2.5 mt-auto pt-4 border-t border-[#38BDF810]">
                        {props.website && (
                            <a href={props.website} target="_blank" rel="noreferrer"
                                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-primaryColor to-accentColor text-bgColor text-sm font-semibold font-space hover:opacity-90 transition-all duration-200">
                                <IconExternalLink size={16} />
                                Live Website
                            </a>
                        )}
                        {props.playStore && (
                            <a href={props.playStore} target="_blank" rel="noreferrer"
                                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#38BDF830] text-primaryColor text-sm font-semibold font-space hover:bg-[#38BDF810] hover:border-primaryColor/60 transition-all duration-200">
                                <IconBrandGooglePlay size={16} />
                                Play Store
                            </a>
                        )}
                        {props.github && (
                            <a href={props.github} target="_blank" rel="noreferrer"
                                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#38BDF830] text-primaryColor text-sm font-semibold font-space hover:bg-[#38BDF810] hover:border-primaryColor/60 transition-all duration-200">
                                <IconBrandGithub size={16} />
                                GitHub
                            </a>
                        )}
                        {!hasLinks && (
                            <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#38BDF818] text-textColor text-sm font-medium font-space cursor-default select-none">
                                <IconLock size={15} />
                                Private / NDA
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FullProjectModal;
