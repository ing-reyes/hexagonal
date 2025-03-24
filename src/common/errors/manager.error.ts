import { HttpStatus } from "../enums/http-status.enum";

export class ManagerError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public statusMsg: keyof typeof HttpStatus,
    ) {
        super()
    }

    //! 100
    static continue(message: string) {
        return new ManagerError(100, message, 'CONTINUE');
    }

    static switchingProtocols(message: string) {
        return new ManagerError(101, message, 'SWITCHING_PROTOCOLS');
    }

    static processing(message: string) {
        return new ManagerError(102, message, 'PROCESSING');
    }

    static earlyhints(message: string) {
        return new ManagerError(103, message, 'EARLYHINTS');
    }

    //! 200
    static ok(message: string) {
        return new ManagerError(200, message, 'OK');
    }

    static created(message: string) {
        return new ManagerError(201, message, 'CREATED');
    }

    static accepted(message: string) {
        return new ManagerError(202, message, 'ACCEPTED');
    }

    static nonAuthoritativeInformation(message: string) {
        return new ManagerError(203, message, 'NON_AUTHORITATIVE_INFORMATION');
    }

    static noContent(message: string) {
        return new ManagerError(204, message, 'NO_CONTENT');
    }

    static resetContent(message: string) {
        return new ManagerError(205, message, 'RESET_CONTENT');
    }

    static partialContent(message: string) {
        return new ManagerError(206, message, 'PARTIAL_CONTENT');
    }

    //! 300
    static ambiguous(message: string) {
        return new ManagerError(300, message, 'AMBIGUOUS');
    }

    static movedPermanently(message: string) {
        return new ManagerError(301, message, 'MOVED_PERMANENTLY');
    }

    static found(message: string) {
        return new ManagerError(302, message, 'FOUND');
    }

    static seeOther(message: string) {
        return new ManagerError(303, message, 'SEE_OTHER');
    }

    static notModified(message: string) {
        return new ManagerError(304, message, 'NOT_MODIFIED');
    }

    static temporaryRedirect(message: string) {
        return new ManagerError(307, message, 'TEMPORARY_REDIRECT');
    }

    static permanentRedirect(message: string) {
        return new ManagerError(308, message, 'PERMANENT_REDIRECT');
    }

    //! 400
    static badRequest(message: string) {
        return new ManagerError(400, message, 'BAD_REQUEST');
    }

    static unauthorized(message: string) {
        return new ManagerError(401, message, 'UNAUTHORIZED');
    }

    static paymentRequired(message: string) {
        return new ManagerError(402, message, 'PAYMENT_REQUIRED');
    }

    static forbiden(message: string) {
        return new ManagerError(403, message, 'FORBIDDEN');
    }

    static notFound(message: string) {
        return new ManagerError(404, message, 'NOT_FOUND');
    }

    static methodNotAllowed(message: string) {
        return new ManagerError(405, message, 'METHOD_NOT_ALLOWED');
    }

    static notAcceptable(message: string) {
        return new ManagerError(406, message, 'NOT_ACCEPTABLE');
    }

    static proxyAuthenticationRequired(message: string) {
        return new ManagerError(407, message, 'PROXY_AUTHENTICATION_REQUIRED');
    }

    static requestTimeout(message: string) {
        return new ManagerError(408, message, 'REQUEST_TIMEOUT');
    }

    static conflict(message: string) {
        return new ManagerError(409, message, 'CONFLICT');
    }

    static gone(message: string) {
        return new ManagerError(410, message, 'GONE');
    }

    static lengthRequired(message: string) {
        return new ManagerError(411, message, 'LENGTH_REQUIRED');
    }

    static preconditionFailed(message: string) {
        return new ManagerError(412, message, 'PRECONDITION_FAILED');
    }

    static payloadTooLarge(message: string) {
        return new ManagerError(413, message, 'PAYLOAD_TOO_LARGE');
    }

    static uriTooLong(message: string) {
        return new ManagerError(414, message, 'URI_TOO_LONG');
    }

    static unsupportedMediaType(message: string) {
        return new ManagerError(415, message, 'UNSUPPORTED_MEDIA_TYPE');
    }

    static requestedRangeNotSatisfiable(message: string) {
        return new ManagerError(416, message, 'REQUESTED_RANGE_NOT_SATISFIABLE');
    }

    static expectationFailed(message: string) {
        return new ManagerError(417, message, 'EXPECTATION_FAILED');
    }

    static iAmATeapot(message: string) {
        return new ManagerError(418, message, 'I_AM_A_TEAPOT');
    }

    static misdirected(message: string) {
        return new ManagerError(421, message, 'MISDIRECTED');
    }

    static unprocessableEntity(message: string) {
        return new ManagerError(422, message, 'UNPROCESSABLE_ENTITY');
    }
    
    static failedDependency(message: string) {
        return new ManagerError(424, message, 'FAILED_DEPENDENCY');
    }

    static preconditionRequired(message: string) {
        return new ManagerError(428, message, 'PRECONDITION_REQUIRED');
    }

    static tooManyRequests(message: string) {
        return new ManagerError(429, message, 'TOO_MANY_REQUESTS');
    }

    //! 500
    static internalServerError(message: string = 'Internal Server Error') {
        return new ManagerError(500, message, 'INTERNAL_SERVER_ERROR');
    }

    static notImplemented(message: string) {
        return new ManagerError(501, message, 'NOT_IMPLEMENTED');
    }

    static badGateway(message: string) {
        return new ManagerError(502, message, 'BAD_GATEWAY');
    }

    static serviceUnavailable(message: string) {
        return new ManagerError(503, message, 'SERVICE_UNAVAILABLE');
    }

    static gatewayTimeout(message: string) {
        return new ManagerError(504, message, 'GATEWAY_TIMEOUT');
    }

    static httpVersionNotSupported(message: string) {
        return new ManagerError(505, message, 'HTTP_VERSION_NOT_SUPPORTED');
    }
}