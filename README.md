<img src="https://user-images.githubusercontent.com/8014761/189776285-15b3468e-6ae9-46f2-8394-f1dc6a86b658.png" alt="greenbox logo" style="width: 50%;">

**freecandy.exe** is a script meant to farm the recurring [Hallowe'en](https://kol.coldfront.net/thekolwiki/index.php/Halloween) holiday within the [Kingdom of Loathing](https://www.kingdomofloathing.com/). On Hallowe'en, players can derive high profits by visiting the infinitely recurring trick-or-treating blockss; this script aims to run your treat-filled Hallowe'en turns in the quickest way possible.

To install, run the following command on an up-to-date KolMafia version:

```
git checkout loathers/freecandydotexe release
```

## Running freecandy

In its simplest form, running freecandy just requires running the following command in the mafia GCLI:

```
freecandy 10
```

Where "10" would be replaced by an integer telling the script how many blocks you would like to run while trick-or-treating. If you do not include a number after `freecandy`, the script will just run until you're out of adventures. This script will use the familiar you have equipped as your primary fight familiar; pick the familiar you want freecandy to use prior to the invocation of the script.

```
freecandy help
```

Will list additional options that you may run, the most notable of which is the `treatOutfit` argument (equivalent to the `freecandy_treatOutfit` mafia preference), which will tell freecandy to use a particular outfit to harvest candies from hallowe'en houses. If you leave this property blank (and fail to pass it as an argument), freecandy will make this decision on its own, but you are unlikely to like that decision because it will use mall data to decide, and many candies are laying fallow in the mall at high prices with low sale volume. Be warned!

## Documentation

One important alert for all interested users:

:warning: **<span style="color:red">FREECANDY.EXE WILL NOT DIET FOR YOU; IT WILL JUST USE ADVENTURES. FILL YOUR ORGANS!</span>** :warning:

For more details beyond this blisteringly important note:

- For more information about what freecandy.exe does and does not do, [click here](documentation/scope.md).
- To peruse frequently asked questions about freecandy, [click here](documentation/faq.md).

To report bugs, please post issues on this GitHub repository.
