import { useEffect, useState } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

const useSocket = (
  serverUrl: string,
  opts?: Partial<ManagerOptions & SocketOptions>,
): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Khởi tạo socket
    const socketInstance = io(serverUrl, {
      transports: ["websocket"],
      ...opts,
      port: process.env.PORT_SOCKET,
    });

    setSocket(socketInstance);

    // Cleanup khi unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
