"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.07,
    minSpeed: 0.05,
  },
};

// Hardcoded dark theme — no next-themes provider needed
const BG_HEX = "#0F172A";
const FALLBACK_HEX = "#38BDF8";

export const renderCustomIcon = (icon: SimpleIcon) =>
  renderSimpleIcon({
    icon,
    bgHex: BG_HEX,
    fallbackHex: FALLBACK_HEX,
    minContrastRatio: 2,
    size: 50,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      {/* @ts-ignore */}
      <>{renderedIcons}</>
    </Cloud>
  );
}
