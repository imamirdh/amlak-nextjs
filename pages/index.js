// import Features from "@/components/templates/index/Features";
// import Gallery from "@/components/templates/index/Gallery";
// import Homes from "@/components/templates/index/Homes";
// import Story from "@/components/templates/index/Story";
import React from "react";
import dynamic from 'next/dynamic'
 
const Features = dynamic(() => import('@/components/templates/index/Features'), { ssr: false })
const Story = dynamic(() => import('@/components/templates/index/Story'), { ssr: false })
const Homes = dynamic(() => import('@/components/templates/index/Homes'), { ssr: false })
const Gallery = dynamic(() => import('@/components/templates/index/Gallery'), { ssr: false })
function index() {
  return (
    <>
      <Features />
        <Story />
        <Homes />
        <Gallery />
    </>
  );
}

export default index;
