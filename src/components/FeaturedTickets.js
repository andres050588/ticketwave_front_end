import TicketList from "./TicketList"

export default function FeaturedTickets() {
    return (
        <div className="bg-light">
            <TicketList title="🎟️ Biglietti in Primo Piano" limit={6} showSeeAllButton />
        </div>
    )
}
