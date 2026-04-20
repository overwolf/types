/**
 * Use this API to create local web servers and WebSocket clients, and to send
 * HTTP requests from within an Overwolf app.
 * @packageDocumentation
 */

/**
   * Fired a mouse wheel has been used.
   */
  const onMouseWheel: Event<WheelEvent>;

}

declare namespace overwolf.web {
  namespace enums {
    /** The HTTP method to use when sending a fetch request. */
    const enum HttpRequestMethods {
      /** Retrieve a resource. */
      GET = "GET",
      /** Retrieve only the headers for a resource. */
      HEAD = "HEAD",
      /** Submit data to a resource. */
      POST = "POST",
      /** Replace a resource entirely. */
      PUT = "PUT",
      /** Remove a resource. */
      DELETE = "DELETE",
      /** Apply a partial update to a resource. */
      PATCH = "PATCH",
    }
    /** The type of a WebSocket message. */
    const enum MessageType {
      /** A ping control frame. */
      Ping = "ping",
      /** A binary data frame. */
      Binary = "binary",
      /** A UTF-8 text data frame. */
      Text = "text",
    }

  }

  /** Connection parameters used to create a `WebSocket` client. */
  interface WebSocketConnectionParams {
    /** Whether to use a secure (`wss://`) connection. */
    secured: boolean;
    /** The port number to connect to. */
    port: number;
    /** Optional credentials for basic authentication. */
    credentials: { username: string; password: string; };
    /** A list of sub-protocols to negotiate with the server. */
    protocols: string[];
  }

  /** A local HTTP web server instance returned by `createServer`. */
  interface WebServer {
    /**
     * Listens for requests on the given port. If the port is already in use, or
     * this instance is already listening, an error will be returned.
     * @param callback Fired with the status of the request.
     */
    listen(callback: CallbackFunction<any>): void;
    /**
     * Closes the web server. It can be re-opened again.
     */
    close(): void;
    /**
     * Fired when the web server receives an incoming request. The event
     * contains three strings: 'url', 'content' and 'contentType'.
     */
    onRequest: Event<RequestEvent>;
  }

  /** A WebSocket client instance returned by `createWebSocket`. */
  interface WebSocket {
    /**
     * Listens for requests on the given port.
     * @param callback
     */
    connect(callback: CallbackFunction<Result>): void;
    /**
     * Send message.
     * @param message
     * @param callback
     */
    send(message: string, callback: CallbackFunction<Result>): void;
    /**
     * Closes the websocket. It can be re-opened again.
     */
    close(): void;
    /**
     * Fired when the websocket receives an incoming message.
     */
    onMessage: Event<MessageEvent>;
    /**
     * Fired on error.
     */
    onError: Event<ErrorEvent>;
    /**
     * Fired on websocket connection Opened.
     */
    onOpen: Event<{}>;
    /**
     * Fired when connection closed.
     */
    onClosed: Event<ClosedEvent>;
  }

  /** A single HTTP header key-value pair used in a fetch request. */
  interface FetchHeader {
    /** The header field name. */
    key: string;
    /** The header field value. */
    value: string;
  }

  /** Result of `createServer`, containing the new `WebServer` instance. */
  interface CreateServerResult extends Result {
    /** The created web server instance. */
    server?: WebServer;
  }

  /** Result of `createWebSocket`, containing the new `WebSocket` client instance. */
  interface CreateWebSocketResult extends Result {
    /** The created WebSocket client instance. */
    client?: WebSocket;
  }

  /** Result of a `sendHttpRequest` call, containing the HTTP status code and response body. */
  interface SendHttpRequestResult extends Result {
    /** The HTTP status code returned by the server. */
    statusCode?: number;
    /** The response body as a string. */
    data?: string;
  }

  /** Describes an incoming HTTP request received by a `WebServer`. */
  interface RequestEvent {
    /** The request URL path. */
    url: string;
    /** The request body content. */
    content: string;
    /** The MIME type of the request body. */
    contentType: string;
  }

  /** Describes a message received on a WebSocket connection. */
  interface MessageEvent {
    /** The message payload. */
    message: string;
    /** The type of the message frame. */
    type: overwolf.web.enums.MessageType;
  }

  /** Describes an error that occurred on a WebSocket connection. */
  interface ErrorEvent {
    /** A human-readable description of the error. */
    message: string;
    /** The underlying exception object, if available. */
    exception: any;
  }

  /** Describes the reason a WebSocket connection was closed. */
  interface ClosedEvent {
    /** The WebSocket close status code. */
    code: number;
    /** A human-readable explanation for why the connection was closed. */
    reason: string;
  }

  /**
   * Creates a local HTTP web server on the specified port. The returned
   * `WebServer` instance must have its `listen` method called before it will
   * accept connections.
   * @param port The port number to bind the server to.
   * @param callback Called with the result, including the new `WebServer` instance on success.
   */
  function createServer(
    port: number,
    callback: CallbackFunction<CreateServerResult>
  ): void;

  /**
   * Creates a WebSocket client connection to localhost/127.0.0.1, bypassing
   * certificate verification. Call `connect` on the returned `WebSocket`
   * instance to open the connection.
   * @param connectionParams Connection parameters including port, protocol list, and optional credentials.
   * @param callback Called with the result, including the new `WebSocket` client instance on success.
   */
  function createWebSocket(
    connectionParams: WebSocketConnectionParams,
    callback: CallbackFunction<CreateWebSocketResult>
  ): void;

