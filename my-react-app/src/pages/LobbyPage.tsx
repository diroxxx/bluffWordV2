import { useLocation } from "react-router-dom";
import { useListOfPlayers } from "../hooks/useListOfPlayers";
import { useAtom } from "jotai";
import { playerInfoAtom } from "../atoms/playerInfoAtom";
import { useEffect } from "react";
import { gameRoomAtom } from "../atoms/gameRoomAtom";
import { deletePlayerByIdAndCode } from "../api/deletePlayerByIdAndCode";
function LobbyPage() {


    const location = useLocation();
    const{code} = location.state || {};
    console.log("LobbyPage loaded with room code:", code); 
    const [player, setPlayer] = useAtom(playerInfoAtom);
    const [gameRoom, setGameRoom] = useAtom(gameRoomAtom);

    const { connected, messages: playersResult, send } = useListOfPlayers(player?.roomCode);

    function handleDeleteUser() {
    
    
    
    }


        useEffect(() => {
        setGameRoom({
            roomCode: player?.roomCode || "",
            players: [],
        });
    }, [code, setGameRoom]);

    useEffect(() => {
        if (!connected) {
            console.log("Connecting to lobby websocket...");
        } else {
            console.log("Connected to lobby websocket.");
            try {
                send({});
                console.log("Request sent successfully"); 
            } catch (error) {
                console.error("Error sending request:", error);
            }
            setGameRoom((prev) => ({
                ...prev,
                roomCode: code || prev.roomCode,
            }));
        }
    }, [connected, code, send, setGameRoom]);

    useEffect(() => {
        if (playersResult.length > 0) {
            const latestPlayers = playersResult[0];
            console.log("Received players:", latestPlayers);
            setGameRoom((prev) => ({
                ...prev,
                roomCode: code || prev.roomCode,
                players: latestPlayers,
            }));
        }
        console.log("Updated players list:", playersResult);
    }, [playersResult, setGameRoom, code]);


    return (
        <div className="relative min-h-screen overflow-hidden bg-deep-space-blue">
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0 bg-linear-to-br from-molten-lava/20 via-deep-space-blue to-brick-red/20 animate-pulse-slow" />
                <div className="absolute inset-0 bg-linear-to-tl from-steel-blue/10 to-transparent animate-pulse-slow delay-1000" />
            </div>

            <div className="absolute inset-0 backdrop-blur-sm" />

            <div className="relative min-h-screen flex flex-col items-center justify-center px-6 gap-16">
                
                <div className="text-center space-y-8">
                    <h1 className="text-6xl md:text-8xl font-thin tracking-widest text-papaya-whip/90">
                        ROOM {player?.roomCode}
                    </h1>

                    <p className="text-steel-blue/70 text-sm md:text-base tracking-widest uppercase">
                        {connected ? "Connected" : "Connecting..."}
                    </p>
                </div>

                <div className="w-full max-w-md space-y-6">
                    <div className="bg-deep-space-blue/50 border border-steel-blue/30 rounded-xl p-6 backdrop-blur-xl">
                        <h2 className="text-papaya-whip/90 text-xl tracking-wider mb-4 text-center">
                            PLAYERS ({gameRoom.players.length})
                        </h2>
                        
                        <div className="space-y-3">
                            {gameRoom.players.map((player) => (
                                <div
                                    key={player.id}
                                    className="bg-deep-space-blue/30 border border-steel-blue/20 rounded-lg px-4 py-3 flex items-center justify-between"
                                >
                                    <span className="text-papaya-whip/90 tracking-wide">
                                        {player.nickname}
                                    </span>
                                    {player.isHost && (
                                        <span className="text-brick-red text-xs tracking-wider">
                                            HOST
                                        </span>
                                    )}
                                </div>
                            ))}
                            
                            {gameRoom.players.length === 0 && (
                                <p className="text-steel-blue/50 text-center py-4 tracking-wide">
                                    Waiting for players...
                                </p>
                            )}
                        </div>
                    </div>

                    {player?.isHost && (
                        <button
                            className="w-full py-4 bg-papaya-whip/10 hover:bg-papaya-whip/20 text-papaya-whip border border-papaya-whip/30 rounded-xl text-lg font-medium tracking-wider transition-all duration-300 backdrop-blur-xl"
                        >
                            START GAME
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
export default LobbyPage;