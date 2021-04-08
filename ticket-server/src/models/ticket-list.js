const Ticket = require('./ticket');

class TicketList {
    constructor() {
        this.lastNumber = 0;

        this.pendings = [];
        this.assigned = [];
    }

    get nextNumber() {
        this.lastNumber++;
        return this.lastNumber;
    }

    get historyTickets() {
        return this.assigned.slice(0, 13);
    }

    createNewTicket() {
        const newTicket = new Ticket(this.nextNumber);
        this.pendings.push(newTicket);
        return newTicket;
    }

    assignTicket(agent, desktop) {
        if (this.pendings.length === 0) {
            return null;
        }

        const nextTicket = this.pendings.shift();
        nextTicket.agent = agent;
        nextTicket.desktop = desktop;

        this.assigned.unshift(nextTicket);

        return nextTicket;
    }
}

module.exports = TicketList;