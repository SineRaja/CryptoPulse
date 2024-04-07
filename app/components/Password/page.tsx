"use client"
import React, { useState } from "react";
import Head from "next/head";
import Header from "../Header";

export default function Password() {
    const [input, setInput] = useState(10);
    const [password, setPassword] = useState("");
    const [fileName, setFileName] = useState("password");
    const [passwordCriteria, setPasswordCriteria] = useState({
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
    });

    // Handler for the checkboxes
    const handleChange = (e:any) => {
        const { name, checked } = e.target;
        setPasswordCriteria((prev) => ({ ...prev, [name]: checked }));
    };

    // Handler for generating the password
    const generatePassword = () => {
        const characterSets = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
        };

        let characterTypes = [];
        if (passwordCriteria.uppercase) characterTypes.push(characterSets.uppercase);
        if (passwordCriteria.lowercase) characterTypes.push(characterSets.lowercase);
        if (passwordCriteria.numbers) characterTypes.push(characterSets.numbers);
        if (passwordCriteria.symbols) characterTypes.push(characterSets.symbols);

        if (characterTypes.length === 0) {
            alert("Please select at least one character type.");
            return;
        }

        let tempPassword = "";
        const combinedCharacters = characterTypes.join("");

        for (let i = 0; i < input; i++) {
            tempPassword += combinedCharacters[Math.floor(Math.random() * combinedCharacters.length)];
        }

        setPassword(tempPassword);
    };

    // Handler for saving the password to a file
    const saveToFile = () => {
        const blob = new Blob([password], { type: "text/plain" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = `${fileName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
        <Header />
            <Head>
                <title>Password Generator</title>
            </Head>

            <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
                <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-4xl font-bold text-center mb-6">Password Generator</h1>
                    <div className="space-y-4">
                        <label className="flex justify-between items-center">
                            <span>Uppercase Letters</span>
                            <input
                                name="uppercase"
                                type="checkbox"
                                checked={passwordCriteria.uppercase}
                                onChange={handleChange}
                                className="form-checkbox h-6 w-6"
                            />
                        </label>
                        <label className="flex justify-between items-center">
                            <span>Lowercase Letters</span>
                            <input
                                name="lowercase"
                                type="checkbox"
                                checked={passwordCriteria.lowercase}
                                onChange={handleChange}
                                className="form-checkbox h-6 w-6"
                            />
                        </label>
                        {/* ... more inputs for numbers and symbols */}
                    </div>
                    <div className="mt-6">
                        <label className="block mb-2">Password Length</label>
                        <input
                            type="range"
                            min="8"
                            max="25"
                            value={input}
                            onChange={(e) => setInput(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm">
                            <span>8</span>
                            <span>25</span>
                        </div>
                    </div>
                    <button
                        onClick={generatePassword}
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                        Generate Password
                    </button>
                    {password && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <p className="text-lg font-mono">{password}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={saveToFile}
                                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors duration-200"
                                >
                                    Save to File
                                </button>
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Enter file name"
                                    className="form-input px-4 py-2 rounded"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
