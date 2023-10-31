import {
  $familiars,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $skills,
  Delayed,
  get,
  have,
  SourceTerminal,
  StrictMacro,
} from "libram";
import { getMonsters, Item, Skill } from "kolmafia";
import { CombatStrategy } from "grimoire-kolmafia";
import { shouldRedigitize } from "./lib";
import args from "./args";

export class Macro extends StrictMacro {
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
    const spammableItem =
      $items`dictionary, facsimile dictionary, spices`.find((item) => have(item)) ??
      $item`seal tooth`;
    return Macro.item(spammableItem);
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
      $item`porquoise-handled sixgun`,
      $skill`Summon Love Gnats`,
      $skill`Bowl Straight Up`,
      $skill`Sing Along`,
    ])
      .externalIf(SourceTerminal.isCurrentSkill($skill`Extract`), Macro.skill($skill`Extract`))
      .while_("!pastround 11", Macro.stasisItem());
  }

  static stasis(): Macro {
    return new Macro().stasis();
  }

  redigitize(): Macro {
    return this.externalIf(shouldRedigitize(), Macro.trySkill($skill`Digitize`));
  }

  static redigitize(): Macro {
    return new Macro().redigitize();
  }

  default(): Macro {
    return this.if_($monster`All-Hallow's Steve`, Macro.abort())
      .externalIf(
        $familiars`Stocking Mimic, Ninja Pirate Zombie Robot, Comma Chameleon, Feather Boa Constrictor, Cocoabo`.includes(
          args.familiar
        ),
        Macro.stasis(),
        Macro.try([
          ...$skills`Curse of Weaksauce, Micrometeorite, Sing Along, Bowl Straight Up`,
          ...$items`porquoise-handled sixgun, Rain-Doh indigo cup`,
        ])
          .externalIf(SourceTerminal.isCurrentSkill($skill`Extract`), Macro.skill($skill`Extract`))
          .externalIf(
            have($skill`Just the Facts`) && get("_circadianRhythmsRecalled"),
            Macro.if_(
              getMonsters($location`Trick-or-Treating`),
              Macro.trySkill($skill`Recall Facts: %phylum Circadian Rhythms`)
            )
          )
      )
      .kill();
  }

  static default(): Macro {
    return new Macro().default();
  }
}

export class CandyStrategy extends CombatStrategy {
  constructor(macro: Delayed<Macro> = () => Macro.default()) {
    super();
    this.autoattack(macro).macro(macro);
  }
}
