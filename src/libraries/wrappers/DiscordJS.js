/**
 * Discord.JS Client
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */

/**
 * Shoukaku's Library Plugin for Discord.JS
 * @class DiscordJS
 */
class DiscordJS {
    /**
     * @param {Client} client Library client
     */
    constructor(client) {
        /**
         * @type {Client} 
         */
        this.client = client;
    }
    /**
     * Getters for the library important things
     * @returns {Object}
     */
    getters() {
        return {
            // guild cache, must be a map or anything that extends from map
            guilds: this.client.guilds.cache,
            // getter for user id
            id: () => this.client.user.id,
            // websocket shard payload sender
            ws: (shardId, payload, important = false) => this.client.ws.shards.get(shardId)?.send(payload, important),
        };
    }
    /**
     * Builds this library
     * @param {Shoukaku} shoukaku Your Shoukaku instance
     * @param {Object[]} nodes Array of Lavalink nodes to initially connect to
     * @param {string} nodes.name Lavalink node name
     * @param {string} nodes.url Lavalink node url without prefix like, ex: http://
     * @param {string} nodes.auth Lavalink node password
     * @param {boolean} [nodes.secure=false] Whether this node should be in secure wss or https mode
     * @param {string} [nodes.group] Lavalink node group
     * @returns {Object}
     */
    build(oxy, nodes) {
        if (!nodes?.length) throw new Error('No nodes supplied');
        // attach to ready event "once"
        this.client.once('ready', () => oxy._clientReady(nodes));
        // attach to raw event
        this.client.on('raw', packet => oxy._clientRaw(packet));
        // return the getters for Shoukaku's usage
        return this.getters();
    }
}

module.exports = DiscordJS;