import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import shurikenSvg from "../assets/shuriken.svg";

type SectionIcon = LucideIcon | string;

export function SectionHeader({
  icon,
  name,
  title,
  desc,
}: {
  icon: SectionIcon;
  name: string;
  title: string;
  desc: string;
}) {
  const isImg = typeof icon === "string";
  const isShuriken = icon === shurikenSvg;
  const Icon = isImg ? null : icon as LucideIcon;
  const badgeRef = useRef<HTMLDivElement>(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    if (!isShuriken) return;
    const el = badgeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSpin(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isShuriken]);

  return (
    <>
      <div className="section-icon-row">
        <div
          ref={badgeRef}
          className={`section-icon-badge${isImg ? " section-icon-badge-img" : ""}`}
        >
          {isImg
            ? <img src={icon as string} alt="" className={`section-icon-img${spin ? " section-icon-spin" : ""}`} />
            : Icon && <Icon size={20} strokeWidth={2.2} />
          }
        </div>
        <span className="section-icon-name">{name}</span>
      </div>
      <div className="section-desc-block">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </>
  );
}
