import { useLocation } from "react-router-dom";
import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { playerInfoAtom } from "../atoms/playerInfoAtom";
import { postCreateRoom } from "../api/postCreateRoom";
import { postJoinRoom } from "../api/postJoinRoom";


function EnterNamePage() {
    const location = useLocation();
    const { mode, code } = location.state || {};
    const [nickname, setNickname] = useState<string>("");
    const [maxPlayers, setMaxPlayers] = useState<number>(4);
    const navigate = useNavigate();

    const [user, setUser] = useAtom(playerInfoAtom);

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleSubmit = () => {
        if (!nickname.trim()) return alert("Enter your nickname first!");
        console.log({ mode, code, nickname });

        if (mode === "CREATE") {
            postCreateRoom(nickname).then((data) => {
            setUser(data);
            // Najpierw idź do innej strony, potem do lobby
            // navigate("/", { replace: true });
            setTimeout(() => {
            navigate("/lobby");

        }, 10);
                
            }).catch((err) => {
                console.error("Error creating room:", err);
                alert("Failed to create room. Please try again.");
            });
        } else if (mode === "JOIN") {
            postJoinRoom(nickname, code).then((data) => {
                setUser(data);
                //some animations or loading screen can be added here
                navigate("/lobby");
            }).catch((err) => {
                console.error("Error joining room:", err);
                alert("Failed to join room. Please check the room code and try again.");
            });

        }
    };

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
                        BLUFFWORD
                    </h1>

                    <p className="text-steel-blue/70 text-sm md:text-base tracking-widest uppercase">
                        {mode === "CREATE" ? "Create a new room" : `Join room ${code}`}
                    </p>
                </div>

                <div className="w-full max-w-sm space-y-6">
                    <input
                        type="text"
                        placeholder="ENTER YOUR NICKNAME"
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="w-full px-5 py-4 bg-deep-space-blue/50 border border-steel-blue/30 text-papaya-whip/90 placeholder-steel-blue/50 rounded-xl focus:outline-none focus:border-papaya-whip/70 backdrop-blur-xl text-center tracking-widest text-lg uppercase"
                    />

                    {mode === "CREATE" && (
                        <div className="space-y-3">
                            <label className="text-steel-blue/70 text-sm tracking-wider uppercase text-center block">
                                Max Players
                            </label>
                            <div className="flex gap-2 justify-center">
                                {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setMaxPlayers(num)}
                                        className={`w-12 h-12 rounded-xl text-lg font-medium tracking-wider transition-all duration-300 backdrop-blur-xl ${
                                            maxPlayers === num
                                                ? "bg-papaya-whip/20 text-papaya-whip border-2 border-papaya-whip/70"
                                                : "bg-deep-space-blue/30 text-steel-blue/70 border border-steel-blue/30 hover:border-papaya-whip/50 hover:text-papaya-whip/70"
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-papaya-whip/10 hover:bg-papaya-whip/20 text-papaya-whip border border-papaya-whip/30 rounded-xl text-lg font-medium tracking-wider transition-all duration-300 backdrop-blur-xl"
                    >
                        {mode === "CREATE" ? "CREATE ROOM" : "JOIN ROOM"}
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 text-steel-blue/70 hover:text-papaya-whip/70 text-sm tracking-wider transition-all duration-300"
                    >
                        ← BACK
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EnterNamePage;