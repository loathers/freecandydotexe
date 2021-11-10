import { $item, $items, $skill, have, SourceTerminal, StrictMacro } from "libram";

export default class Macro extends StrictMacro {
  tryHaveSkill(skill: Skill | null): Macro {
    if (!skill) return this;
    return this.externalIf(have(skill), Macro.trySkill(skill));
  }

  static tryHaveSkill(skill: Skill | null): Macro {
    return new Macro().tryHaveSkill(skill);
  }

  tryHaveItem(item: Item | null): Macro {
    if (!item) return this;
    return this.externalIf(have(item), Macro.tryItem(item));
  }

  static tryHaveItem(item: Item | null): Macro {
    return new Macro().tryHaveItem(item);
  }

  try(actions: (Item | Skill)[]): Macro {
    return this.step(
      ...actions.map((action) => {
        if (action instanceof Item) {
          return Macro.tryHaveItem(action);
        } else return Macro.tryHaveSkill(action);
      })
    );
  }

  static try(actions: (Item | Skill)[]): Macro {
    return new Macro().try(actions);
  }

  stasisItem(): Macro {
    const spammableItem = $items`dictionary, facsimile dictionary, spices, seal tooth`.find(
      (item) => have(item)
    );
    if (spammableItem) return Macro.item(spammableItem);
    return Macro.item($item`seal tooth`);
  }

  static stasisItem(): Macro {
    return new Macro().stasisItem();
  }

  kill(): Macro {
    return this.if_(
      "monstername *ghost",
      Macro.externalIf(
        have($skill`Silent Treatment`),
        Macro.skill($skill`Silent Treatment`)
          .attack()
          .repeat()
      )
        .skill($skill`Saucegeyser`)
        .repeat()
    )
      .attack()
      .repeat();
  }

  static kill(): Macro {
    return new Macro().kill();
  }

  stasis(): Macro {
    return this.try([
      $skill`Curse of Weaksauce`,
      $skill`Micrometeorite`,
      $skill`Shadow Noodles`,
      $skill`Shell Up`,
      $item`Time-Spinner`,
      $item`little red book`,
      $item`nasty-smelling moss`,
      $item`HOA citation pad`,
      $item`Great Wolf's lice`,
      $item`Mayor Ghost's scissors`,
      $item`Rain-Doh indigo cup`,
      $skill`Summon Love Gnats`,
      $skill`Sing Along`,
    ])
      .externalIf(SourceTerminal.isCurrentSkill($skill`Extract`), Macro.skill($skill`Extract`))
      .while_("!pastround 11", Macro.stasisItem());
  }

  static stasis(): Macro {
    return new Macro().stasis();
  }
}
