import { Timeline, useMatches } from "@mantine/core";
import { IconSchool } from "@tabler/icons-react";
import { EducationInfo } from "../User";

const EducationItem = (items: any) => {
    const size = useMatches({
        xs: 15,
        md: 20,
    })
    return items.map((item: any, index: number) => {
        const isBtech = item.degree === "B.Tech";
        
        return (
            <Timeline.Item 
                data-aos="fade-up" 
                data-aos-duration="800"
                key={index} 
                className="!pt-12 !mb-2 sm-mx:!p-1" 
                bullet={<IconSchool className="!text-bgColor" size={size} />}
            >
                <div className="border shadow-[0_0_10px_0_#64FFDA50] hover:-translate-y-2 transition transform duration-300 ease-in-out flex flex-col gap-3 border-primaryColor p-5 rounded-2xl sm-mx:p-3">
                    <div className="flex gap-3 items-center">
                        {item.image && !isBtech && (
                            <img 
                                className="rounded-lg w-16 md-mx:w-14" 
                                src={`${process.env.PUBLIC_URL}/${item.image}`} 
                                alt="Institution" 
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }} 
                            />
                        )}
                        <div className="flex flex-col gap-2">
                            <div className="text-white text-2xl font-semibold sm-mx:text-xl xs-mx:text-lg xsm-mx:text-base">
                                {item.degree}
                            </div>
                            <div className="text-lg font-semibold text-primaryColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs">
                                {item.institution}
                            </div>
                            <div className="text-textColor text-base md-mx:text-sm sm-mx:text-xs flex flex-wrap gap-2 items-center">
                                <span className="font-medium">{item.grade}</span>
                                <span className="text-primaryColor">•</span>
                                <span>{item.date}</span>
                                {item.location && (
                                    <>
                                        <span className="text-primaryColor">•</span>
                                        <span>{item.location}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {isBtech && item.image && (
                        <div className="mt-4">
                            <img 
                                className="rounded-lg w-full shadow-[0_0_10px_0_#64FFDA30]" 
                                src={`${process.env.PUBLIC_URL}/${item.image}`} 
                                alt={item.institution} 
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }} 
                            />
                        </div>
                    )}
                </div>
            </Timeline.Item>
        );
    })
}

const Education = () => {
    const size = useMatches({
        xs: 15,
        md: 20,
    })
    const dot = useMatches({
        xs: 25,
        md: 30,
    })
    
    return (
        <div className="px-16 mx-20 md-mx:px-6 sm-mx:px-2 lg-mx:mx-0 my-10 mb-28 font-mono" id="Education">
            <h1 className="text-4xl sm-mx:text-3xl xs-mx:text-2xl mb-10 font-bold text-center text-white">
                <span className="text-primaryColor">02.&nbsp;</span>Education
            </h1>
            <Timeline color="#64FFDA" active={5} bulletSize={dot} lineWidth={2}>
                {EducationItem(EducationInfo)}
                <Timeline.Item bullet={<IconSchool className="!text-bgColor" size={size} />}></Timeline.Item>
            </Timeline>
        </div>
    )
}

export default Education;

