import { Badge, Indicator, Modal, ScrollArea } from "@mantine/core";
import { IconBrandGithub, IconExternalLink, IconLock } from "@tabler/icons-react";

const FullProjectModal = (props: any) => (
    <Modal.Root scrollAreaComponent={ScrollArea.Autosize} size="auto" centered opened={props.opened} onClose={props.close}>
        <Modal.Overlay className="!backdrop-opacity-80 blur-sm" />
        <Modal.Content className="!rounded-2xl !overflow-hidden">
            <Modal.Header className="!bg-cardBg !border-b !border-[#38BDF818] !px-6 !py-4">
                <Modal.Title data-autofocus className="!text-2xl sm-mx:!text-xl !font-bold !text-white !font-space flex items-center gap-2">
                    {props.title}
                    {props.live && (
                        <Badge size="sm" variant="outline" color="red"
                            rightSection={<Indicator color="red" position="middle-end" size={7} processing />}>
                            Live
                        </Badge>
                    )}
                </Modal.Title>
                <Modal.CloseButton size="sm" className="!bg-transparent !text-textColor hover:!text-white" />
            </Modal.Header>

            <Modal.Body className="!bg-cardBg !p-6 sm-mx:!p-4">
                <img
                    src={`${process.env.PUBLIC_URL}/${props.image}`}
                    alt={props.title}
                    className="w-full rounded-xl border border-[#38BDF815] mb-5"
                />

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {props.technologies.map((tech: string, i: number) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[#38BDF825] bg-[#38BDF808] text-primaryColor">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Bullet points */}
                {props.points?.length > 0 && (
                    <ul className="flex flex-col gap-2.5 mb-5">
                        {props.points.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-textColor leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-primaryColor flex-shrink-0 mt-[7px]" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Summary paragraph */}
                <p className="text-textColor/70 text-xs leading-[1.85] border-t border-[#38BDF810] pt-4">
                    {props.desc}
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                    <a href={props.github} target="_blank" rel="noreferrer"
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#38BDF830] text-primaryColor text-sm font-medium font-space hover:bg-[#38BDF810] hover:border-primaryColor/60 transition-all duration-200 ${props.live ? "flex-1" : "w-full"}`}>
                        <IconBrandGithub size={16} />
                        View Code
                    </a>
                    {props.live ? (
                        <a href={props.link} target="_blank" rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-primaryColor to-accentColor text-bgColor text-sm font-semibold font-space hover:opacity-90 transition-all duration-200">
                            <IconExternalLink size={16} />
                            Live App
                        </a>
                    ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#38BDF818] text-textColor text-sm font-medium font-space cursor-default select-none">
                            <IconLock size={15} />
                            Private / NDA
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal.Content>
    </Modal.Root>
);

export default FullProjectModal;
