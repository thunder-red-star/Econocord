"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ClientSocket_1 = require("./ClientSocket");
class Client extends events_1.EventEmitter {
    constructor(name, { maximumRetries = Infinity, retryTime = 1000, handshakeTimeout = 10000 } = {}) {
        super();
        /**
         * A map of servers this client is connected to.
         * @since 0.7.0
         */
        this.servers = new Map();
        this.name = name;
        this.retryTime = retryTime;
        this.maximumRetries = maximumRetries;
        this.handshakeTimeout = handshakeTimeout;
    }
    connectTo(...options) {
        // @ts-ignore
        return new ClientSocket_1.ClientSocket(this).connect(...options);
    }
    /**
     * Disconnect from a socket, this will also reject all messages.
     * @param name The label name of the socket to disconnect
     * @since 0.7.0
     */
    disconnectFrom(name) {
        const client = this.get(name);
        if (client)
            return client.disconnect();
        throw new Error(`The socket ${name} is not connected to this one.`);
    }
    /**
     * Get a NodeSocket by its name or Socket.
     * @param name The NodeSocket to get
     * @since 0.7.0
     */
    get(name) {
        if (typeof name === 'string')
            return this.servers.get(name) || null;
        if (name instanceof ClientSocket_1.ClientSocket)
            return name;
        throw new TypeError('Expected a string or a ClientSocket instance.');
    }
    /**
     * Check if a NodeSocket exists by its name of Socket.
     * @param name The NodeSocket to get
     * @since 0.7.0
     */
    has(name) {
        return Boolean(this.get(name));
    }
    /**
     * Send a message to a connected socket.
     * @param name The label name of the socket to send the message to
     * @param data The data to send to the socket
     * @param options The options for this message
     * @since 0.7.0
     */
    sendTo(name, data, options) {
        const nodeSocket = this.get(name);
        return nodeSocket
            ? nodeSocket.send(data, options)
            : Promise.reject(new Error('Failed to send to the socket: It is not connected to this client.'));
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map