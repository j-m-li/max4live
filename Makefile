
all:
	node toamxd.js -m source/m.json  devices/m.amxd
	node toamxd.js -a source/a.json  devices/a.amxd
	node toamxd.js -i source/i.json  devices/i.amxd


