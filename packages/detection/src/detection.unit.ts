import { Types } from "./Types";
import { typeEnumToName } from "./typeEnumToName";

describe("detection", () => {
    describe("typeEnumToName", () => {
        it("should return the correct name for each type", () => {
            expect(typeEnumToName(Types.Unknown)).toBe("Unknown");
            expect(typeEnumToName(Types.Null)).toBe("Null");
            expect(typeEnumToName(Types.Date)).toBe("Date");
            expect(typeEnumToName(Types.DateTime)).toBe("DateTime");
            expect(typeEnumToName(Types.Integer)).toBe("Integer");
            expect(typeEnumToName(Types.Double)).toBe("Double");
            expect(typeEnumToName(Types.Boolean)).toBe("Boolean");
            expect(typeEnumToName(Types.String)).toBe("String");
        });
    });
});
