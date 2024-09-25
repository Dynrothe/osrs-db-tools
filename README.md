# osrs-db-tools

### What is this?

A quick and dirty parsing tools create an item db json for https://backlayouts.com/

### The code sucks and is horrible

But hey, it works.

### How do I use this abomination?

First, download the latest cache dump from [here](https://github.com/abextm/osrs-cache/releases). Copy the folder `item_defs` contents into the `item_defs` folder in this project. (Or just replace the folder entirely, I'm not your dad)

Recommended but not entirely necessary, depends how much you hate Runelite. Clone [static.runelite.net](https://github.com/runelite/static.runelite.net) repository and copy the contents of `icon` folder from `/cache/item/` into the `icon` folder in this project. (Refer to the dad joke above)

Run the command of your choosing:

Creates `item-db.json` from scratch.

```
node .\itemDatabase.js --create
```

Updates `item-db.json` with new items

```
node .\itemDatabase.js --update
```

Recreates all item icons in pre-existing `item-db.json` with new icons from the `icon` folder.

```
node .\itemDatabase.js --iconsFromFile
```

Updates **NEW** items in `item-db.json` with icons from `static.runelite.net` (Should only be used after running update command)

```
node .\itemDatabase.js --iconsFromRunelite
```

Creates `clog-db.json` from scratch, which contains only the items found in the Collection Log **(DOES NOT WORK)**

```
node .\itemDatabase.js --clog
```
