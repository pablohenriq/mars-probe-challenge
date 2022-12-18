export default class Probe {
  /**
   * @param {number} plateau
   * @param {string} state
   */
  constructor(plateau, state) {
    /**
     * @type {number}
     */
    this.plateau = plateau;

    /**
     * @type {string}
     */
    this.state = state;
  }

  /**
   * @returns {string}
   */
  get position() {
    return this.state;
  }

  /**
   * @returns {number}
   */
  get x() {
    return Number(this.state[0]);
  }

  /**
   * @returns {number}
   */
  get y() {
    return Number(this.state[1]);
  }

  /**
   * @returns {string}
   */
  get pole() {
    return this.state[2];
  }

  /**
   * @returns {boolean}
   */
  isWithinplateau() {
    const [edgeX, edgeY] = this.plateau.toString().split("");
    return this.x <= Number(edgeX) && this.y <= Number(edgeY);
  }

  /**
   * @param {string} command
   * @returns {string}
   */
  move(command) {
    const moves = command.split("");
    const [edgeX, edgeY] = this.plateau.toString().split("");
    const directions = {
      L: { N: "W", W: "S", S: "E", E: "N" },
      R: { N: "E", E: "S", S: "W", W: "N" },
      M: {
        /**
         * @param {number} x
         * @param {number} y
         */
        N: (x, y) => [x, Math.min(Number(edgeY), y + 1)],

        /**
         * @param {number} x
         * @param {number} y
         */
        E: (x, y) => [Math.min(Number(edgeX), x + 1), y],

        /**
         * @param {number} x
         * @param {number} y
         */
        S: (x, y) => [x, Math.max(0, y - 1)],

        /**
         * @param {number} x
         * @param {number} y
         */
        W: (x, y) => [Math.max(0, x - 1), y],
      },
    };

    for (const move of moves) {
      if (move === "L" || move === "R") {
        this.state = `${this.x}${this.y}${directions[move][this.pole]}`;
      } else if (move === "M") {
        const [newX, newY] = directions[move][this.pole](this.x, this.y);
        this.state = `${newX}${newY}${this.pole}`;
      }
    }

    return this.state;
  }
}
