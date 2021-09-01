# freecandy.exe
freecandy.exe is a perfectly legitimate and inconspicuous script for running blocks on hallowe'en.

## What will freecandy.exe do?
freecandy.exe will pick an outfit for you, or use a pre-selected one, to get candy. It will build an outfit for combats that will value +weight mostly appropriately if you're using a stasis-familiar or a riftlet-like, and it will always use the familiar you start it with for combat. It will fight digitized wanderers, guaranteed kramcos, voting monsters, and nemesis hitmen. It will re-digitize digitized wanderers at appropriate intervals. It will abort when you fight your final nemesis hitman. It will use the tot for halloween noncombats, and one of those one-item outfits for its halloween combats. It will make your parents understand you in ways they never did before. It will get you huge bowls of candy in huge quantities for huge amounts of meat. It will fill your pantsgiving stomach. It will change the world around you imperceivably.

## What won't freecandy.exe do?
freecandy.exe will not set up digitized monsters for you. It will not progress the nemesis quest beyond fighting hitmen. It will not fill your stomach or liver or spleen, except for in the aforementioned pantsgiving case. It will not take items from the clan stash for you. It will not make you a better person. It will not do beginning-of-day free-fights, or any of the myriad fantastic features that garbo has. It will not repair that which is forever broken. It will not use a sneegleeb.

## How do I use freecandy.exe
First, install it. Give your gCLI the ol' `svn checkout https://github.com/Loathing-Associates-Scripting-Society/freecandydotexe/branches/release/`. Then, if you want to use a specific outfit for treats, set `freecandy_treatOutfit` to the name of your outfit as a string. After that, take out the familiar you want to use for fights, and run `freecandy`. Running it with no arguments, like that, will make it run until it's either out of adventures or hits the right nemesis wanderer. If you want to run a particular number of blocks, just do `freecandy n`, where `n` is the number of blocks you want it to run
