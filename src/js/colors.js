
var assert = require('assert');

var colors = {
0: "ae494f",
1: "9a3031",
2: "8cd42e",
3: "a0417a",
4: "91c656",
5: "299f7a",
6: "c65d1e",
7: "b2bbd6",
8: "2d4024",
9: "4b5715",
10: "ffcc80",
11: "3f1174",
12: "b22a90",
13: "fff3e0",
14: "4c858b",
15: "18bebe",
16: "b5044b",
17: "d6b1d4",
18: "fecb40",
19: "748882",
20: "4a3c95",
21: "482916",
22: "267bf0",
23: "5af7e2",
24: "adeacc",
25: "cf2b03",
26: "b3c459",
27: "353f9",
28: "5d4993",
29: "ba8d15",
30: "da2457",
31: "ff17fe",
32: "d6e81d",
33: "daf2db",
34: "19b510",
35: "18e26f",
36: "b7c36a",
37: "8cb175",
38: "bdce32",
39: "f2e0ba",
40: "a2f8a5",
41: "64bf50",
42: "f1a771",
43: "4982a9",
44: "f66c41",
45: "2fe802",
46: "bda142",
47: "8342ff",
48: "2b4ab4",
49: "ad4595",
50: "bae4f",
51: "b76d01",
52: "8e8207",
53: "285b9f",
54: "c4422a",
55: "f1eaa7",
56: "e3a0cc",
57: "65c116",
58: "656ccf",
59: "7c25f4",
60: "1e18d1",
61: "688a7d",
62: "1fe786",
63: "425716",
64: "4ac043",
65: "547836",
66: "24a216",
67: "fd9bba",
68: "24894d",
69: "c54b03",
70: "6fbdce",
71: "cff1dd",
72: "8805fb",
73: "fe99d2",
74: "c52f14",
75: "e31c54",
76: "d010eb",
77: "b83436",
78: "c294b6",
79: "564a6c",
80: "531bcf",
81: "c04b8c",
82: "3cd2ef",
83: "82286c",
84: "aa2639",
85: "86be6c",
86: "e62102",
87: "5471fc",
88: "05c089",
89: "703c75",
90: "9a8e8f",
91: "8b9307",
92: "fcbc82",
93: "ea5978",
94: "b8e370",
95: "43474b",
96: "262d2b",
97: "ddd67e",
98: "344867"
}

export function getColor(color){
    if (typeof(color) === "string") {
        color = parseInt(color);
    }
    if (!(color >= 10 && color <= 98))
        debugger;
    assert(color >= 10 && color <= 98, `Color (${color}) is not within the expected range`);
    return colors[color];
}
