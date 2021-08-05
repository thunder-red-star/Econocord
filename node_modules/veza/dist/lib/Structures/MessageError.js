"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeserializerError_1 = require("binarytf/dist/lib/errors/DeserializerError");
/**
 * The MessageError class for deserializer errors
 * @since 0.7.0
 * @extends Error
 */
class MessageError extends Error {
    /**
     * Constructs a MessageError instance.
     * @since 0.7.0
     * @param prefix The prefix indicating more information about the error.
     * @param error The DeserializerError instance to wrap.
     */
    constructor(prefix, error) {
        super(`${prefix}: ${error.message} [${error.kind}]`);
        this.kind = error.kind;
    }
}
exports.MessageError = MessageError;
/**
 * Creates an error.
 * @since 0.7.0
 * @param prefix The prefix indicating what the error is.
 * @param error The original error to wrap.
 * @internal
 * @private
 */
function makeError(prefix, error) {
    /* istanbul ignore else: Safe guard for edge cases. */
    if (error instanceof DeserializerError_1.DeserializerError)
        return new MessageError(prefix, error);
    /* istanbul ignore next: Safe guard for edge cases. */
    return new Error(`${prefix}: ${error.message}`);
}
exports.makeError = makeError;
//# sourceMappingURL=MessageError.js.map