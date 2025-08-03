const fs = require('fs');

console.log("hello");

let f = fs.readFileSync(process.argv[2]);
let h = new Uint8Array(f);

switch (process.argv[2]) {
case "-h":
	break;
}
let o = 0;
let d = "{";
d += "\"I\":[" ;
let n = (h[2] + (h[3]<<8) + (h[4]<<16) + (h[5]<<24));
d += n;
o = 6;
d += "," + (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
o = 10;
d += "," + (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
d += "]\n";
o = 48 + n * 4;
n = (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
d += ",\"SampleData\":" + n;
o += 16;
d += ",\"SampleData$\":" + (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
o += 4;
n = (h[o] + (h[o+1]<<8) + (h[o+2]<<16) + (h[o+3]<<24));
console.log("o = " + o + " " + n);
let i;
o += 4;
d += ", \"";
for (i = 0; i < n; i += 1) {

	d += String.fromCodePoint(h[o+i*2]);
}
d += "\":0";


d += "\n}\n";
fs.writeFileSync(process.argv[3], d, "utf8");
fs.appendFileSync(process.argv[3], "", "utf8");

