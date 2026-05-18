describe("Outfit Functions", () => {
  it("should have all required exports", async () => {
    // Dynamically import to ensure all dependencies are handled correctly
    const outfitModule = await import('./outfit');
    
    expect(outfitModule.getTreatOutfit).toBeDefined();
    expect(outfitModule.treatOutfit).toBeDefined();
    expect(outfitModule.combatOutfit).toBeDefined();
    expect(outfitModule.trickOutfit).toBeDefined();
    expect(outfitModule.digitizeOutfit).toBeDefined();
  });
});