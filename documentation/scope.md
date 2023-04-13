# Outlining the Scope of freecandy.exe

In this page, we're going to outline exactly what freecandy is meant to do. This is an evolving document that will ideally be updated as new features are implemented within freecandy. However, it is worth noting that while the developers (the Loathers admin team & the script's captain, [@horrible-little-slime]) are updating freecandy to provide light support to relevant new IOTMs, there is minimal appetite to considerably rework or revamp this script.

As such, most large-scale changes that would impact this overall scope document would require pull requests from interested parties, likely folks outside of the core repository developers. Or, as the cool kids might say: we welcome PRs that would change this scope (so long as they do not impact the maintainability of this script), but it is very unlikely for scope change to come from us.

With this addressed, let's outline things that this script does and does not do, starting with the things it does not do, as these are the things most often ignored by users who want to register bug reports.

## Out-of-Scope

- **freecandy.exe will not steal your identity.**
- **freecandy.exe will not fill your organs (stomach/liver/spleen).**
  - At least, it won't do it well.
  - There is one small and minor exception to this rule -- if you have pantsgiving, freecandy will wear it as part of its outfit optimizer and consume the new incremental fullness as it gets added to your stomach.
- **freecandy.exe will not set up digitized monsters for you.**
  - As noted below, the script -will- fight them, if you've already digitized. But it isn't going to set them up for you.
- **freecandy.exe will not complete the nemesis quest.**
  - As noted below, the script will stop if you reach the final wandering hitman, allowing you to manually progress the quest. But it will not do this for you.
- **freecandy.exe will not take items from the clan stash for you.**
- **freecandy.exe will not do beginning-of-the-day free fights, like garbage-collector does.**
- **freecandy.com will not use a KoL Con 13 snowglobe.**
  - If you can think of a reasonable value to assign to it or the Can of Mixed Everything, please let us know!
- **freecandy.exe will not cast or recast buffs.**
  - We would recommend you utilize mafia's [mood architecture](https://wiki.kolmafia.us/index.php/Mood) if you would like mafia to recast buffs while using freecandy.
- **freecandy.exe will not work at all if you leave your items in Hagnks.**
- **freecandy.exe will not work well (or possibly at all) if mafia has an incorrect image of your character-state, which can be caused by playing KoL outside of mafia, or by playing KoL in a different mafia installation.**

## In-Scope

- **freecandy.exe will pick an outfit for you.**
  - When choosing this outfit, freecandy will defer to any outfit that you have personally selected through the use of the `freecandy_treatOutfit` preference. Simply put an outfit name in there to force this script to use that as part of your trick or treating outfit, provided you have the stats to use it.
  - It is important to note that this outfit **will be optimized** -- freecandy has an internal optimization engine that will attempt to maximize your profits in the fights it is allowed to do, and will select an equippable outfit accordingly. If you are using a stasis-like familiar (like the Stocking Mimic) or a turns-generating familiar (like the Reagnimatied Gnome), the outfit constructor will take that into account.
- **freecandy.exe will use whatever familiar you invoke the script with (or whichever familiar is passed using the `familiar` argument) as your core "fights" familiar.**
  - If you have a trick-or-treating tot, freecandy will use the tot to double your candy gains from the noncombats, but will use whatever familiar you enter the script with on all of the weird free combats from each block.
- **freecandy.exe will fight wanderers for you.**
  - This includes (but is not limited to): digitized wanderers, guaranteed kramcos, initial nemesis quest wanderers, parka YRs, and voting monsters. It will also re-digitize your digitized monster at appropriate intervals to ensure you max out your digitized wanderers.
  - It will also lovingly place each wanderer into a zone designed to maximize profit. If you have no such zone, it'll less-lovingly place them in the Haunted Kitchen.
- **freecandy.exe will use one of the one-item outfits for its halloween combats.**
  - These include: invisible bag, witch hat, beholed bedsheet, wolfman mask, pumpkinhead mask, and the mummy costume. We would highly recommend purchasing one of these before running freecandy, although the script will try to equip you with the lowest-pain possible outfit you own instead, if needed.
  - It is willing to use certain two-item outfits, but it prefers not to. Because two items are worse than one.
- **freecandy.exe will track its gains, and report them to you at the end of the day.**

## TL;DR

This is not very long! Not reading it is the work of a madman, and failing to read this is grounds for me calling you a "silly goose" and ignoring you if you report a bug or issue. That being said, there is one big punchy summary I would like to leave you with: **freecandy.exe is designed to do run blocks and do tasks that a reasonable person would want to complete while running blocks; it is not designed to do tasks that might occur _before_ or _after_ running blocks**. That is the great running theme of this page; I wrote freecandy because I was tired of running tricktreat.ash (a great and venerable script to which freecandy owes a debt of blood) and constantly interrupting it to fight digitized monsters, or guaranteed kramcos, or a third example. It is not intended to be an all-day script for hallowe'en.
