class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config){
            throw new Error();
        }
        this.states = config.states;
        this.initial = config.initial;
        this.history = [];
        this.history.push(this.initial);
        this.position = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.position];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state] === undefined) {
            throw new Error();
        }
        if (this.history[this.position] !== state) {
            this.position++;
            this.history.push(state);
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var state = this.history[this.position];
        if (this.states[state].transitions[event] === undefined) {
            throw new Error();
        }

        if (this.history[this.position + 1] !== this.states[state].transitions[event]) {
            this.history.push(this.states[state].transitions[event]);
        }
        this.position++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history[this.position] = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var possibleStates = [];

        for (var key in this.states) {
            if (this.states[key].transitions[event] !== undefined || event===undefined){
                possibleStates.push(key);
            }
        }
        return possibleStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.position === 0) {
            return false;
        } else {
            this.position--;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history.hasOwnProperty(this.position + 1)) {
            this.position++;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.position = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
