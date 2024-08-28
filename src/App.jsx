import { useState, useEffect, useRef, useCallback } from "react";

const App = () => {
	const [length, setLength] = useState(12);
	const [numbers, setNumbers] = useState(false);
	const [characters, setCharacters] = useState(false);
	const [password, setPassword] = useState("");
	const [copy, setCopy] = useState("copy");

	const passRef = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = "",
			str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numbers) str += "0123456789";
		if (characters) str += "`~!@#$%^&*()-_+=|{}[]:;'<>,.?/";

		for (let i = 0; i < length; i++) {
			let index = Math.floor(Math.random() * str.length);
			pass += str[index];
		}

		setPassword(pass);
	}, [length, numbers, characters, setPassword]);

	const copyPasswordToClipboard = useCallback(() => {
		if (passRef) {
			passRef.current.select();
			passRef.current.setSelectionRange(0, length);
			window.navigator.clipboard.writeText(password);
		}
	}, [password]);

	const changeCopy = () => {
		setCopy("copied");
		setTimeout(() => {
			setCopy("copy");
		}, 2000);
	};

	useEffect(() => {
		passwordGenerator();
	}, [length, numbers, characters, passwordGenerator]);

	return (
		<div className="w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 bg-gray-700 text-orange-500">
			<h1 className="text-white text-center my-3">Password Generator</h1>

			<div className="flex overflow-hidden shadow rounded-lg mb-4">
				<input
					type="text"
					className="outline-none w-full py-1 px-3"
					value={password}
					placeholder="Password"
					ref={passRef}
					readOnly
				/>
				<button
					className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
					onClick={() => {
						copyPasswordToClipboard();
						changeCopy();
					}}
				>
					{copy}
				</button>
			</div>

			<div className="flex text-sm gap-x-2">
				<div className="flex gap-x-1 items-center">
					<input
						type="range"
						className="cursor-pointer"
						min={6}
						max={100}
						value={length}
						onChange={(e) => {
							setLength(e.target.value);
						}}
					/>
					<label>Length | {length} </label>
				</div>

				<div className="flex gap-x-1 items-center">
					<input
						type="checkbox"
						defaultChecked={numbers}
						id="numberInput"
						onChange={() => {
							setNumbers((prev) => !prev);
						}}
					/>
					<label htmlFor="numberInput">Numbers</label>
				</div>

				<div className="flex gap-x-1 items-center">
					<input
						type="checkbox"
						id="charInput"
						defaultChecked={characters}
						onChange={() => {
							setCharacters((prev) => !prev);
						}}
					/>
					<label htmlFor="charInput">Characters</label>
				</div>
			</div>
		</div>
	);
};

export default App;
