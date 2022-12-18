import { expect, describe, it, beforeEach } from "vitest";
import Probe from "../src/probe";

describe("Probe", () => {
  let probe;

  beforeEach(() => {
    probe = new Probe(33, "22N");
  });

  describe("constructor", () => {
    it("should set the state and plateau properties", () => {
      expect(probe.state).to.equal("22N");
      expect(probe.plateau).to.equal(33);
    });
  });

  describe("position", () => {
    it("should return the current state of the probe", () => {
      expect(probe.position).to.equal("22N");
    });
  });

  describe("x", () => {
    it("should return the x coordinate of the probe", () => {
      expect(probe.x).to.equal(2);
    });
  });

  describe("y", () => {
    it("should return the y coordinate of the probe", () => {
      expect(probe.y).to.equal(2);
    });
  });

  describe("pole", () => {
    it("should return the direction the probe is facing", () => {
      expect(probe.pole).to.equal("N");
    });
  });

  describe("isWithinplateau", () => {
    it("should return true if the probe is within the plateau", () => {
      expect(probe.isWithinplateau()).to.be.true;
    });

    it("should return false if the probe is outside the plateau", () => {
      probe.state = "44N";
      expect(probe.isWithinplateau()).to.be.false;
    });
  });

  describe("move", () => {
    it("should return the new state of the probe after moving", () => {
      expect(probe.move("LMLMLMLMM")).to.equal("23N");
      expect(probe.move("MMRMMRMRRM")).to.equal("33N");
    });
  });
});
