import { ethers } from "ethers";
import axios from "axios";

import contractABI from "./artifacts/contracts/Main.sol/Main.json";
const contractAddress = "0x510e926B6c03416AE7D6ad7D8039cB6C7cA307A9";

export var provider;
export var signer;
export var contract;
export var abiInterface = new ethers.Interface(contractABI.abi);
export var errorList = contractABI.abi.filter((item) => item.type === "error");

export async function connect() {
    if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not installed");
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    return {
        provider,
        signer,
        contract,
    };
}

export async function execute(fn, params = []) {
    try {
        if (
            params &&
            params[params.length - 1] &&
            params[params.length - 1].length > 100000
        ) {
            try {
                const res = await axios.post("http://localhost:3000/upload", {
                    data: { img: params[params.length - 1] },
                });
                params[params.length - 1] = res.data;
            } catch (error) {
                console.log("Can't upload image", error);
                return;
            }
        }
        await connect();
    } catch (error) {
        console.log("Can't connect to contract", error);
    }

    try {
        return await fn(...params);
    } catch (error) {
        // Lỗi do giao dịch
        try {
            var detailError = abiInterface.parseError(error.data);
            error.name = detailError.fragment.name;
            error.data = detailError;
            debugger;
        } catch (error) {}
        throw error;
    }
}

export default {
    provider,
    signer,
    contract,
    connect,
    execute,
};
