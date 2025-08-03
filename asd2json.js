const fs = require('fs');

console.log("hello");

let f = fs.readFileSync(process.argv[2]);
let h = new Uint8Array(f);

switch (process.argv[2]) {
case "-h":
	break;
}

function dbl(o)
{
	return int32(o);
}

function int32(o)
{
	return (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
}

function utf16(o, l)
{
	let i;
	let d = "";
	let s = int32(o);
	if (s > l) {
		console.log("utf16 len " + s);
		return [0,0];
	}
	o += 4;
	for (i = 0; i < s; i += 1) {
		d += String.fromCodePoint(h[o+i*2]);
	}
	return [d,s*2+4];
}

function ascii(o, l)
{
	let i;
	let d = "";
	let s = h[o];
	if (s > l) {
		console.log("ascii len " + s);
		return [0,0];
	}
	o++;
	for (i = 0; i < s; i += 1) {
		d += String.fromCodePoint(h[o+i]);
	}
	return [d,s+1];
}


let o = 0;
let d = "{";
d += "\"I\":[" ;
o = 2;
let n = int32(o);
let r;
d += n;
o = 6;
d += "," + int32(o);
o = 10;
d += "," + int32(o);
d += "]\n";

o = 34 + n * 4;
n = h.length - o;
o += 3;
r = ascii(o, n);
d += ",\"" + r[0] + "\": " ;
o += r[1];
o += 1;
d += int32(o) + " ";
o += 4;
r = ascii(o, n);
d += ",\"" + r[0] + "\": " ;
o += r[1];
let nb_field = int32(o);
d += nb_field + " ";
o += 4;

let i = 0;
n = h.length - o;
while (i < n) {
	if (nb_field < 1) {
		break;
	}
	nb_field--;
	r = utf16(o + i, n - i);
	if (r[1] < 1) {
		break;
	}
	d += ",\n \"" + r[0] +"\":";
	i += r[1];
	i++;
	r = ascii(o + i, n - i);
	if (r[1] < 1) {
		break;
	}
	i += r[1];
	switch (r[0]) {
	case "RemoteableDouble":
	case "RemoteableBool":
	case "UserFloat":
	case "RemoteableEnum":
	case "RemoteableTimeSignature":
	case "RemoteableInt":
	case "RemoteableList":
	case "OnSets":
	case "OnsetArray":
	case "AufTaktData":
	case "SampleOverView":
		break;
	default:
		console.log("case \"" + r[0] + "\":");
	}
	d += " \"" + r[0] +"\" ";
}
o += i;
console.log("end : " + o + " = " + h.length);
d += "\n}\n";
fs.writeFileSync(process.argv[3], d, "utf8");
fs.appendFileSync(process.argv[3], "", "utf8");

