import { Text, Timeline, useMatches } from "@mantine/core";
import { IconBriefcaseFilled, IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from "@tabler/icons-react";
import { ExperienceInfo } from "../User";

const TimelineItem = (items: any) => {
    const size=useMatches({
        xs:15,
        md:20,
    })
    return items.map((item: any, index: number) => <Timeline.Item data-aos="fade-up" data-aos-duration="800"
        key={index} className="!pt-12 !mb-2 sm-mx:!p-1" bullet={<IconBriefcaseFilled className="!text-bgColor" size={size} />} >
        <div className="border shadow-[0_0_10px_0_#64FFDA50] hover:-translate-y-2 transition transform duration-300 ease-in-out flex flex-col gap-3 border-primaryColor p-5 rounded-2xl sm-mx:p-3">
            <div className="flex gap-3 items-center">
                <img className="rounded-lg w-16 md-mx:w-14" src={`${process.env.PUBLIC_URL}/${item.image || item.company}.png`} alt="Company" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }} />
                <div className="flex flex-col gap-1">
                    <div className="text-white text-2xl font-semibold sm-mx:text-xl xs-mx:text-lg xsm-mx:text-base">{item.role}</div>
                    <div className="text-lg font-semibold text-textColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs">{item.company}{item.location && ` • ${item.location}`} • {item.date}</div>
                </div>
            </div>
            
            {item.bullets && item.bullets.length > 0 && (
                <ul className="text-textColor leading-7 text-justify md-mx:text-sm xs-mx:text-xs space-y-2 list-none pl-0">
                    {item.bullets.map((bullet: string, bulletIndex: number) => (
                        <li key={bulletIndex} className="flex items-start gap-2">
                            <span className="text-primaryColor flex-shrink-0">▹</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="text-lg font-medium text-textColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex gap-2 flex-wrap items-center">
                <div className="font-semibold text-white">Technologies:</div>
                <div className="flex gap-2 flex-wrap">
                    {
                        item.skills.map((skill: any, skillIndex: number) => (
                            <span key={skillIndex} className="px-2 py-1 rounded-md bg-primaryColor/10 text-primaryColor border border-primaryColor/30">
                                {skill}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    </Timeline.Item>)
}

const Experience = () => {
    const size=useMatches({
        xs:15,
        md:20,
    })
    const dot=useMatches({
        xs:25,
        md:30,
    })
    return <div className="px-16 mx-20 md-mx:px-6 sm-mx:px-2 lg-mx:mx-0 my-10 mb-28 font-mono" id="Experience">
        <h1 className="text-4xl sm-mx:text-3xl xs-mx:text-2xl  mb-10 font-bold text-center text-white"><span className="text-primaryColor">03.&nbsp;</span>Experience</h1>
        <Timeline color="#64FFDA" active={5} bulletSize={dot} lineWidth={2}>
            {
                TimelineItem(ExperienceInfo)
            }
            <Timeline.Item bullet={<IconBriefcaseFilled className="!text-bgColor" size={size} />} ></Timeline.Item>
        </Timeline>
    </div>
}
export default Experience;