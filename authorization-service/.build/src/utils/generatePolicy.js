"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePolicy = void 0;
var generatePolicy = function (principalId, resource, effect) {
    if (effect === void 0) { effect = 'Allow'; }
    return {
        principalId: principalId,
        policyDocument: {
            Version: Date.now(),
            Statement: [
                {
                    Action: 'execute-api:invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ]
        }
    };
};
exports.generatePolicy = generatePolicy;
//# sourceMappingURL=generatePolicy.js.map