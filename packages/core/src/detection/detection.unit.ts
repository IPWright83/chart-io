import { Type } from "./Type";
import { typeEnumToName } from "./typeEnumToName";

describe("detection", () => {
    describe("typeEnumToName", () => {
        it("should return the correct name for each type", () => {
            expect(typeEnumToName(Type.Unknown)).toBe("Unknown");
            expect(typeEnumToName(Type.Null)).toBe("Null");
            expect(typeEnumToName(Type.Date)).toBe("Date");
            expect(typeEnumToName(Type.DateTime)).toBe("DateTime");
            expect(typeEnumToName(Type.Integer)).toBe("Integer");
            expect(typeEnumToName(Type.Double)).toBe("Double");
            expect(typeEnumToName(Type.Boolean)).toBe("Boolean");
            expect(typeEnumToName(Type.String)).toBe("String");
        });
    });
});
