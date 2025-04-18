import HeroSection from "../components/HeroSection.js"
import HowItWorks from "../components/HowItWorks.js"
import FeaturedTickets from "../components/FeaturedTickets.js"

export default function HomePage() {
    return (
        <>
            <header>
                <HeroSection />
            </header>

            <section>
                <HowItWorks />
            </section>
            <section>
                <FeaturedTickets />
            </section>
        </>
    )
}
