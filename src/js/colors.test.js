import truffleAssertions from 'truffle-assertions';
import { colorSet } from './colors';

it("Should all colors have a length of 6", () => {
    for (var loop = 0; loop < colorSet.length; loop++) {
        assert(colorSet[loop].length == 6, `Colors must be defined with a length of 6: colorSet[${loop}] has a length of ${colorSet[loop].length}: ${colorSet[loop]}`);
    }
});
