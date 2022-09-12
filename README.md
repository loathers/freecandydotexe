# freecandy.exe

**freecandy.exe** is a script meant to farm the recurring [Halloween](https://kol.coldfront.net/thekolwiki/index.php/Halloween) holiday within the [Kingdom of Loathing](https://www.kingdomofloathing.com/). On Halloween, players can derive high profits by visiting the infinitely recurring trick-or-treating blocks, and derive considerably higher value than normal farming methods; this script aims to run your treat-filled Halloween turns in the quickest way possible. 

To install, run the following command on an up-to-date KolMafia version:

``` git checkout loathers/freecandydotexe release```

## Running freecandy

In its simplest form, running freecandy just requires running the following command in the mafia GCLI:

```freecandy 10```

Where "10" would be replaced by an integer telling the script how many blocks you would like to run while trick-or-treating. If you do not include a number after `freecandy`, the script will just run until you're out of adventures. This script will use the familiar you have equipped as your primary fight familiar; pick the familiar you want freecandy to use prior to the invocation of the script.

## Documentation

One important blazing-red alert for all interested users:

**FREECANDY.EXE WILL NOT DIET FOR YOU; IT WILL JUST USE ADVENTURES. AS A USER, YOU MUST FILL YOUR OWN ORGANS.**

For more details beyond this blazing-red extremely-important note:

- For more information about what freecandy.exe does and does not do, [click here](documentation/scope.md).
- To peruse frequently asked questions about freecandy, [click here](documentation/faq.md).

To report bugs, please post issues on this GitHub repository or send messages and report bugs in the Ascension Speed Society [discord](https://discord.gg/tbUCRT5), within the **#mafia-and-scripting** channel.

## How do I use freecandy.exe
Then, if you want to use a specific outfit for treats, set `freecandy_treatOutfit` to the name of your outfit as a string. After that, take out the familiar you want to use for fights, and run `freecandy`. Running it with no arguments, like that, will make it run until it's either out of adventures or hits the right nemesis wanderer. If you want to run a particular number of blocks, just do `freecandy n`, where `n` is the number of blocks you want it to run
