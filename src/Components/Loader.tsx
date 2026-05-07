import { Slugs } from "../User";
import IconCloud from "./magicui/icon-cloud";

export function Loader() {
    return (
        <div className="relative flex h-full w-full items-center justify-center animate-[ping_1.5s_ease-in-out_1_4.5s]">
            <div className="relative" style={{ width: "min(320px, 82vw)" }}>
                <IconCloud iconSlugs={Slugs} />
                {/* KT monogram — vertically offset to match sphere's visual center */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{ paddingTop: 40 }}
                >
                    <div className="text-3xl font-bold font-space text-primaryColor tracking-widest">KT</div>
                </div>
            </div>
        </div>
    );
}
