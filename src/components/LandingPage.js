import React,{lazy} from 'react'
const HeroSectionComponent = lazy(()=> import('./HeroSectionComponent'));
const BodySectionComponent = lazy(()=> import('./BodySectionComponent'));
const FooterSectionComponent = lazy(()=> import('./FooterSectionComponent'));

function LandingPage() {
  return (
    <div>
        <HeroSectionComponent/>
        <BodySectionComponent/>
        <FooterSectionComponent/>
    </div>
  )
}

export default LandingPage