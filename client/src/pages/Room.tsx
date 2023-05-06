import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerAction, PeerState } from "../context/peerReducer";
export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id]);
  return (
    <>
      Welcome to {id} room{" "}
      <div className="grid grid-cols-4 gap-4">
        <VideoPlayer stream={stream} />

        {Object.values(peers as PeerState).map((peer) => (
          <VideoPlayer stream={peer.stream} />
        ))}
      </div>
    </>
  );
};
