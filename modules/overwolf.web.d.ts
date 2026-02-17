/**
   * Fired a mouse wheel has been used.
   */
  const onMouseWheel: Event<WheelEvent>;

}

declare namespace overwolf.web {
  namespace enums {
    const enum HttpRequestMethods {
      GET = "GET",
      HEAD = "HEAD",
      POST = "POST",
      PUT = "PUT",
      DELETE = "DELETE",
      PATCH = "PATCH",
    }
    const enum MessageType {
      Ping = "ping",
      Binary = "binary",
      Text = "text",
    }

  }

  interface WebSocketConnectionParams {
    secured: boolean;
    port: number;
    credentials: { username: string; password: string; };
    protocols: string[];
  }

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

  interface FetchHeader {
    key: string;
    value: string;
  }

  interface CreateServerResult extends Result {
    server?: WebServer;
  }

  interface CreateWebSocketResult extends Result {
    client?: WebSocket;
  }

  interface SendHttpRequestResult extends Result {
    statusCode?: number;
    data?: string;
  }

  interface RequestEvent {
    url: string;
    content: string;
    contentType: string;
  }

  interface MessageEvent {
    message: string;
    type: overwolf.web.enums.MessageType;
  }

  interface ErrorEvent {
    message: string;
    exception: any;
  }

  interface ClosedEvent {
    code: number;
    reason: string;
  }

  /**
   * Creates a web server. This call returns an object with two fields: A status
   * string and a server object.
   * @param port The port to use.
   * @param callback
   */
  function createServer(
    port: number,
    callback: CallbackFunction<CreateServerResult>
  ): void;

  /**
   * Creates a WebSocket client to localhost/127.0.0.1 while by-passing a valid
   * certificate verification.
   * @param connectionParams
   * @param callback
   */
  function createWebSocket(
    connectionParams: WebSocketConnectionParams,
    callback: CallbackFunction<CreateWebSocketResult>
  ): void;

  