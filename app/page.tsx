import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl'>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard
          id = "123"
          name= "neura the briany explorer"
          topic="neura newtowrk of the brain"
          subject="science"
          duration={45}
          color="#ffda63"
        />
        <CompanionCard
          id = "124"
          name= "countsy the number wizard"
          topic="derivates and integers"
          subject="math"
          duration={35}
          color="#e5d0ff"
        />
        <CompanionCard
          id = "125"
          name= "verb the vocabulary"
          topic="language"
          subject="englilsh"
          duration={30}
          color="#BDE7FF"
        />
      
      </section>
      <section className='home-section'>
        <CompanionsList/>
        <CTA/>
      </section>
    </main>
  )
}

export default Page