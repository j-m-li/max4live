
all:
	node toamxd.js -m source/m.json  devices/m.amxd
	node toamxd.js -a source/a.json  devices/a.amxd
	node toamxd.js -i source/i.json  devices/i.amxd
	node asd2json.js -h media/untitled2.wav.asd media/u.json
	type media\u.json
	node asd2json.js -h media/m.wav.asd media/mu.json
	type media\mu.json

