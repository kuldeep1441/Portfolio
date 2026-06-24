import { useRef, useState } from "react";
import { Badge, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconExternalLink, IconBrandGithub, IconArrowUpRight, IconBrandGooglePlay } from "@tabler/icons-react";
import Tilt from "react-parallax-tilt";
import FullProjectModal from "./FullProjectModal";

const ProjectCard = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [spot, setSpot] = useState({ x: 0, y: 0, show: false });

    const onMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
    };

    return (
        <>
            <Tilt
                className="h-full"
                tiltMaxAngleX={7} tiltMaxAngleY={7}
                glareEnable glareMaxOpacity={0.06} glareColor="#38BDF8"
                glareBorderRadius="16px" scale={1.01} transitionSpeed={500}
            >
                <div
                    ref={cardRef}
                    onClick={open}
                    onMouseMove={onMouseMove}
                    onMouseLeave={() => setSpot((s) => ({ ...s, show: false }))}
                    className="group cursor-pointer relative border border-[#38BDF818] bg-gradient-to-b from-cardBg to-bgColor rounded-2xl overflow-hidden hover:border-[#38BDF845] hover:shadow-[0_16px_40px_0_#00000055] transition-all duration-300 h-full flex flex-col"
                >
                    {/* Mouse spotlight */}
                    <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
                        style={{
                            opacity: spot.show ? 1 : 0,
                            background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(56,189,248,0.07), transparent 70%)`,
                        }}
                    />

                    {/* Image */}
                    <div className="overflow-hidden flex-shrink-0">
                        <img
                            src={`${process.env.PUBLIC_URL}/${props.image}`}
                            alt={props.title}
                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-5 sm-mx:p-4 flex flex-col flex-1">
                        {/* Title + live */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-white font-semibold font-space text-lg sm-mx:text-base leading-tight">
                                    {props.title}
                                </h3>
                                {props.live && (
                                    <Badge size="xs" variant="outline" color="red"
                                        rightSection={<Indicator color="red" position="middle-end" size={5} processing />}
                                        className="!px-1">Live</Badge>
                                )}
                            </div>
                        </div>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {props.technologies.slice(0, 4).map((tech: string, i: number) => (
                                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#38BDF825] bg-[#38BDF808] text-primaryColor">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Bullet points — cleaner than a paragraph */}
                        <ul className="flex flex-col gap-1.5 flex-1">
                            {(props.points || []).slice(0, 3).map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-textColor leading-snug">
                                    <span className="w-1 h-1 rounded-full bg-primaryColor flex-shrink-0 mt-[5px]" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Footer: view details (left) + live action buttons (right) */}
                        <div className="mt-4 pt-3 border-t border-[#38BDF810] flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-1 text-xs text-primaryColor font-medium font-space group-hover:gap-2 transition-all duration-200">
                                <span>View details</span>
                                <IconArrowUpRight size={14} />
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-20">
                                {props.website && (
                                    <a href={props.website} target="_blank" rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primaryColor to-accentColor text-bgColor text-[11px] font-semibold font-space hover:opacity-90 transition-all duration-200">
                                        <IconExternalLink size={13} />
                                        Website
                                    </a>
                                )}
                                {props.playStore && (
                                    <a href={props.playStore} target="_blank" rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#38BDF830] text-primaryColor text-[11px] font-semibold font-space hover:bg-[#38BDF810] hover:border-primaryColor/60 transition-all duration-200">
                                        <IconBrandGooglePlay size={13} />
                                        Play Store
                                    </a>
                                )}
                                {props.github && (
                                    <a href={props.github} target="_blank" rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#38BDF830] text-primaryColor text-[11px] font-semibold font-space hover:bg-[#38BDF810] hover:border-primaryColor/60 transition-all duration-200">
                                        <IconBrandGithub size={13} />
                                        Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>

            <FullProjectModal
                opened={opened} close={close}
                title={props.title} desc={props.desc} points={props.points}
                image={props.image} live={props.live}
                website={props.website} playStore={props.playStore} github={props.github}
                technologies={props.technologies}
            />
        </>
    );
};

export default ProjectCard;
