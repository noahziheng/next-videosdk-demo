import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic'

const ComponentWithNoSSR = dynamic(
	() => import('./components/meetings/index'),
	{ ssr: false }
);

export default function Meetings() {
  return <ComponentWithNoSSR />;
};