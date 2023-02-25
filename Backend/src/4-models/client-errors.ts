abstract class ClientError {
    public constructor(public status: number, public message: string) { }
}

export class RouteNotFoundError extends ClientError {
    public constructor(method: string, route: string) {
        super(404, `Route ${route} on method ${method} not exist`);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `id ${id} not found`);
    }
}

export class ValidationError extends ClientError {
    public constructor(error: string) {
        super(400, error);
    }
}

export class AuthenticationError extends ClientError {
    public constructor(error: string) {
        super(401, error);
    }
}