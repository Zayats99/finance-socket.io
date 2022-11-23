import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import { Status } from "./components";

// const socket = io.connect('f')
const socket = io("http://localhost:4000/");

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [data, setData] = useState([]);

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		socket.emit("start");

		socket.on("ticker", (data) => {
			console.log(data);
			setData(data);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("ticker");
		};
	}, []);

	return (
		<div>
      <Status status={isConnected} />
			{data.map((item, index) => (
				<>
					<p>
						ticker --- {item.ticker}
						exchange --- {item.exchange}
						change --- {item.change}
						change_percent --- {item.change_percent}
						dividend --- {item.dividend}
						yield --- {item.yield}
						last_trade_time --- {item.last_trade_time}
					</p>
				</>
			))}
		</div>
	);
}

export default App;
