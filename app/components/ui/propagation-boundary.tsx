"use client";
export default function PropagationBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
}
