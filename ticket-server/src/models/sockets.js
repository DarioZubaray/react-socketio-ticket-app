const TicketList = require("./ticket-list");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => {

            socket.on('request-ticket', ( data, callback ) => {
                const newTicket = this.ticketList.createNewTicket();
                callback(newTicket);
            });

            socket.on('next-ticket', ({agent, desktop}, callback) => {
                console.log(agent, desktop);
                const ticketAssigned = this.ticketList.assignTicket(agent, desktop);

                callback(ticketAssigned);

                this.io.emit('ticket-assigned', this.ticketList.historyTickets );
            });
        });

    }


}


module.exports = Sockets;