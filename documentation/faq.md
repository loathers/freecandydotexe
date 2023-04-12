# Free-quently Asked Questions

### Migrating from SVN to Git

If you are having issues running the script, we would highly recommend converting from previous SVN installs to Git; having two versions of the same script is unsupported behavior that often leads to scope issues and areas where Mafia runs the older version of the script. Mafia support has been implemented for git in recent revisions, so freecandy users should update their mafia, remove the old SVN repo and convert to git.

```
svn delete Loathing-Associates-Scripting-Society-freecandydotexe-branches-release
```

Then install freecandy.exe as normal, in the core readme.

### Does freecandy.exe do X

Maybe! We have a [whole other page](documentation/scope.md) dedicated to answering this, and the related question "should freecandy.exe do X."

### Why does freecandy.exe not support \[recent iotm\] when \[other, possibly related script\] does?

There are two possible answers to this question, where "two" is actually however many things I end up writing here. The first is that we cannot frequently test freecandy.exe, because it can only be run on hallowe'en, so often times there will be experimental support for \[recent iotm\] that is not yet available on the release branch. The second is that a lot of things aren't actually particularly relevant to freecandy's stated goals; at the time of this writing, the Cursed Monkey's Paw is a fantastic iotm for meat farmers and ascenders, but does nothing for freecandy and its stated goals. The third (apparently two is three today) is that each person who works on freecandy has jobs, lovers, hopes, dreams, and hobbies, and writing code takes time, energy, and focus. That being said: PRs are welcome!